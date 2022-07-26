import { NextRequest, NextResponse } from "next/server";
import {
  BOTD_DEFAULT_URL,
  BOTD_EDGE_PATH,
  COOKIE_NAME,
  EDGE_RESULT_HEADERS,
  REQUEST_STATUS_HEADER,
  REQUEST_ID_HEADER,
  STATUS,
  TIMEOUT,
  ERROR_DESCRIPTION_HEADER,
  AUTO_TOOL_PROB_HEADER,
  AUTO_TOOL_TYPE_HEADER,
  SEARCH_BOT_PROB_HEADER,
  VM_PROB_HEADER,
  BROWSER_SPOOFING_PROB_HEADER,
} from "./constants";

const defaultOptions = {
  useRequestId: true,
};

export async function botdEdge(
  req: NextRequest,
  options: { useRequestId?: boolean } = defaultOptions,
): Promise<NextResponse | undefined> {
  const token = getToken();
  if (!token) return;

  const { pathname } = req.nextUrl;

  const headers = new Headers();
  const body = {
    headers: getHeadersDict(req.headers),
    path: pathname,
    previous_request_id:
      (options.useRequestId && req.cookies.get(COOKIE_NAME)) || "",
    timestamp: Date.now(),
  };

  // `?header` is used to always get results in headers
  const botdReq = fetch(`${BOTD_DEFAULT_URL}${BOTD_EDGE_PATH}?header`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Auth-Token": token,
    },
    body: JSON.stringify(body),
  });

  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("Botd timeout"));
    }, TIMEOUT);
  });

  let botdRes: Response;

  try {
    botdRes = (await Promise.race([botdReq, timeoutPromise])) as Response;
  } catch (err) {
    console.error("Botd failed with:", err);
    return;
  }
  const botdStatus = botdRes.headers.get(REQUEST_STATUS_HEADER);

  // console.log(
  //   "botd edge debug",
  //   botdRes.status,
  //   JSON.stringify(Object.fromEntries(botdRes.headers), null, 2),
  // );

  switch (botdStatus) {
    case STATUS.ERROR: {
      const error = botdRes.headers.get(ERROR_DESCRIPTION_HEADER);

      headers.set(REQUEST_STATUS_HEADER, botdStatus);
      headers.set(ERROR_DESCRIPTION_HEADER, error ?? "");

      console.error("Botd failed to process request with:", error);
      return;
    }
    case STATUS.PROCESSED: {
      for (const name of EDGE_RESULT_HEADERS) {
        const value = botdRes.headers.get(name);
        if (value) {
          headers.set(name, value);
        }
      }

      const requestId = botdRes.headers.get(REQUEST_ID_HEADER);
      // For edge detection not all of these headers return something
      const botProb = Number(botdRes.headers.get(AUTO_TOOL_PROB_HEADER));
      const botType = botdRes.headers.get(AUTO_TOOL_TYPE_HEADER);
      const searchBotProb = Number(botdRes.headers.get(SEARCH_BOT_PROB_HEADER));
      const vmProb = Number(botdRes.headers.get(VM_PROB_HEADER));
      const browserSpoofingProb = Number(
        botdRes.headers.get(BROWSER_SPOOFING_PROB_HEADER),
      );

      const status =
        (botProb > 0 && !!botType) ||
        searchBotProb > 0 ||
        vmProb > 0 ||
        browserSpoofingProb > 0
          ? 403
          : 200;
      let res = new NextResponse(null, { status, headers });

      if (status === 200) {
        // Let Next.js continue
        res = NextResponse.next();
        headers.forEach((v, k) => res.headers.set(k, v));
      }
      res.cookies.set(COOKIE_NAME, requestId!);
      return res;
    }
    default:
      console.error(`Unknown status from botd: ${botdStatus}`);
      return;
  }
}

function getToken() {
  const token = process.env.NEXT_PUBLIC_BOTD_API_TOKEN;

  if (!token) {
    if (process.env.NODE_ENV !== "production") {
      throw new Error("NEXT_PUBLIC_BOTD_API_TOKEN is not defined");
    }
    console.error(
      "Skipping Botd because the env NEXT_PUBLIC_BOTD_API_TOKEN is missing",
    );
  }

  return token;
}

function getHeadersDict(headers: Headers) {
  const headersDict: Record<string, string[]> = {};
  for (const [key, value] of headers) {
    headersDict[key] = [value];
  }
  return headersDict;
}
