import { NextRequest, NextResponse } from "next/server";
import { botdEdge } from "@lib/botd";
import { ROUTE } from "@utils/constant";

const config = {
  // It's possible to run Botd for all paths, but it's better to take
  // advantage of pattern matching and only protect from bots where required.
  matcher: [ROUTE.LOGIN.link, ROUTE.REGISTER.link],
};

export default async function middleware(req: NextRequest) {
  if (config["matcher"].includes(req.nextUrl.pathname)) {
    const res = await botdEdge(req, {
      useRequestId: false,
    });
    if (res && res.status !== 200) {
      // Bot detected!
      req.nextUrl.pathname = ROUTE.BLOCK.link;
      const rewrite = NextResponse.rewrite(req.nextUrl);
      // Move Botd headers to the rewrite response
      res.headers.forEach((v, k) => rewrite.headers.set(k, v));

      return rewrite;
    }
    return res;
  }
}
