import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { botdEdge } from "@lib/botd";
import { ROUTE, URL_WITH_BOTD } from "@utils/constant";

export const config = {
  matcher: URL_WITH_BOTD,
};

export default async function middleware(req: NextRequest) {
  // sec-fetch-mode가 navigate일 경우에는 botd 요청 안 함
  if (req.headers.get("sec-fetch-mode") !== "cors") return;

  const res = await botdEdge(req, {
    useRequestId: false,
  });

  if (res && res.status !== 200) {
    // Bot detected!
    req.nextUrl.pathname = ROUTE.BLOCK;
    const rewrite = NextResponse.rewrite(req.nextUrl);
    // Move Botd headers to the rewrite response
    res.headers.forEach((v, k) => rewrite.headers.set(k, v));
    return rewrite;
  }
  return res;
}
