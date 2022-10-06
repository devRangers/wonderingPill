export const AUTH = {
  SIGN_UP: "/auth/signup",
  SIGN_UP_CHECK: (email: string) => `/auth/signup/check/${email}`,
  SIGN_UP_RESTORE: (email: string) => `/auth/signup/restore/${email}`,
  SIGN_UP_SEND_EMAIL: "/auth/signup/send-email",
  SIGN_UP_TOKEN: "/auth/signup/token",
  SIGN_IN: "/auth/signin",
  REFRESH: "/auth/refresh",
  LOGOUT: "/auth/logout",
  CURRENT: "/auth/current",
  SEND_EMAIL: "/auth/send-email",
  CHANGE_PASSWORD_CHECK: "/auth/change-password/check",
  CHANGE_PASSWORD_EMAIL: (email: string) => `/auth/change-password/${email}`,
  GOOGLE_REDIRECT: "/auth/google-redirect",
  SEND_SMS: "/auth/send-sms",
  VERIFY_CODE: "/auth/verify-code",
  FIND_ACCOUNT: (id: string | string[] | undefined) =>
    `/auth/find-account/${id}`,
};

export const USERS = {
  MYPAGE: "/users/mypage",
  PRESIGNED_URL: "/users/presigned-url",
  PROFILE_IMG: "/users/profile-img",
  UPDATE: "/users/update",
  DELETE: "/users/delete",
  INQUIRY: "/users/inquiry",
};

export const ALARMS = {
  SET: "/alarms/set",
  ID: (id: string) => `/${id}`,
  SET_ID: (id: string | string[] | undefined) => `/alarms/set/${id}`,
  PAGE: (page: number) => `/alarms/${page}`,
  CHECK_ID: (id: string) => `/alarms/check/${id}`,
  DELETE: "/alarms/delete",
};

export const BOOKMARK = {
  BOOKMARK: "/bookmark",
  LIST: "/bookmark/list",
  ID: (id: string) => `/bookmark/${id}`,
};

export const PHARMACY = {
  PHARMACY: "/pharmacy",
  SEARCH: "/pharmacy/search",
  COUNT: "/pharmacy/count",
};

export const PILLS = {
  SEARCH: "/pills/search",
  BOOKMARK_ID: (id: string) => `/pills/bookmark/${id}`,
  RESULT_NAME: (name: string) => `/pills/result/${name}`,
};
