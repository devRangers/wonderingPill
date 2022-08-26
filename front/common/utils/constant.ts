export const MAIN_COLOR = "#A8C0EA";
export const SUB_COLOR = "#9ADCDD";
export const ACCENT_COLOR = "#3C5A93";
export const ERROR_MSG_COLOR = "#bd0000";
export const BOX_COLOR = "#2A306A";

export const HEADER_HEIGHT = "10vh";
export const FOOTER_HEIGHT = "8vh";
export const SIDE_BAR_HEADER_HEIGHT = "7vh";
export const FULL_HEIGHT = "var(--vh, 1vh) * 100";

export const SILENT_REFRESH_TIME =
  Number(process.env.NEXT_PUBLIC_JWT_EXPIRESIN) - 60 * 1000;

export const ROUTE = {
  MAIN: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  EMAIL_FIND: "/account/email/find",
  EMAIL_RESULT: "/account/email/result",
  PASSWORD_FIND: "/account/password/find",
  PASSWORD_NEW: "/account/password/new",
  SEARCH_IMAGE: "/search/image",
  SEARCH_RESULT: "/search/result",
  MY_PAGE: "/my-page",
  MY_PAGE_MODIFY: "/my-page/modify",
  ERROR: "/error",
  BLOCK: "/blocked",
};

export const URL_WITHOUT_HEADER = [
  ROUTE.LOGIN,
  ROUTE.REGISTER,
  ROUTE.EMAIL_FIND,
  ROUTE.EMAIL_RESULT,
  ROUTE.PASSWORD_FIND,
  ROUTE.PASSWORD_NEW,
  ROUTE.ERROR,
  ROUTE.BLOCK,
];
