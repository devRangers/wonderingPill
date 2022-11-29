export const MAIN_COLOR = "#A8C0EA";
export const SUB_COLOR = "#9ADCDD";
export const ACCENT_COLOR = "#3C5A93";
export const SEMI_ACCENT_COLOR = "#567BC4";
export const ERROR_MSG_COLOR = "#bd0000";
export const BOX_COLOR = "#2A306A";
export const GRAY_COLOR = "#A4A4A4";
export const LIGHT_GRAY_COLOR = "#F7F7F7";
export const RED_COLOR = "#FB4646";
export const YELLOW_COLOR = "#FEB024";
export const GREEN_COLOR = "#28C131";

export const HEADER_HEIGHT = "10vh";
export const FOOTER_HEIGHT = "8vh";
export const SIDE_BAR_HEADER_HEIGHT = "7vh";
export const FULL_HEIGHT = "var(--vh, 1vh) * 100";
export const CAPTURE_GUIDE_MOAL_COOKIE = "ClosePopup";

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
  SEARCH: "/search",
  SEARCH_OPTION: "/search/option",
  SEARCH_RESULT_LIST: "/search/result-list",
  SEARCH_RESULT: "/search/result",
  SEARCH_RESULT_PILLNAME: (pillName: string) => `/search/result/${pillName}`,
  SEARCH_PHARMACY: "/search/pharmacy",
  MY_PAGE: "/my-page",
  MY_PAGE_MODIFY: "/my-page/modify",
  MESSAGES: "/messages",
  MESSAGES_SETTING: (bookmarkId: string) => `/messages/setting/${bookmarkId}`,
  GUIDE: "/guide",
  GUIDE_NAV: (dest: string) => `/guide/${dest}`,
  ERROR: "/error",
  BLOCK: "/blocked",
  INFO: "/info",
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
  ROUTE.INFO,
];
