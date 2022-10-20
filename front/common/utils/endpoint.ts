const apiBase = {
  auth: "/auth",
  users: "/users",
  alarms: "/alarms",
  bookmark: "/bookmark",
  pharmacy: "/pharmacy",
  pills: "/pills",
};

export const AUTH = {
  SIGN_UP: `${apiBase.auth}/signup`,
  SIGN_UP_CHECK: (email: string) => `${apiBase.auth}/signup/check/${email}`,
  SIGN_UP_RESTORE: (email: string) => `${apiBase.auth}/signup/restore/${email}`,
  SIGN_UP_SEND_EMAIL: `${apiBase.auth}/signup/send-email`,
  SIGN_UP_TOKEN: `${apiBase.auth}/signup/token`,
  SIGN_IN: `${apiBase.auth}/signin`,
  REFRESH: `${apiBase.auth}/refresh`,
  LOGOUT: `${apiBase.auth}/logout`,
  CURRENT: `${apiBase.auth}/current`,
  SEND_EMAIL: `${apiBase.auth}/send-email`,
  CHANGE_PASSWORD_CHECK: `${apiBase.auth}/change-password/check`,
  CHANGE_PASSWORD_EMAIL: (email: string) =>
    `${apiBase.auth}/change-password/${email}`,
  GOOGLE_REDIRECT: `${apiBase.auth}/google-redirect`,
  SEND_SMS: `${apiBase.auth}/send-sms`,
  FIND_ACCOUNT: (id: string | string[] | undefined) =>
    `${apiBase.auth}/find-account/${id}`,
  VERIFY_CODE: (phone: string, code: string) =>
    `${apiBase.auth}/verify-code?phone=${phone}&code=${code}`,
};

export const USERS = {
  MYPAGE: `${apiBase.users}/mypage`,
  PRESIGNED_URL: `${apiBase.users}/presigned-url`,
  PROFILE_IMG: `${apiBase.users}/profile-img`,
  UPDATE: `${apiBase.users}/update`,
  DELETE: `${apiBase.users}/delete`,
  INQUIRY: `${apiBase.users}/inquiry`,
};

export const ALARMS = {
  SET: `${apiBase.alarms}/set`,
  ID: (bookmarkId: string) => `${apiBase.alarms}/${bookmarkId}`,
  SET_ID: (id: string | string[] | undefined) => `${apiBase.alarms}/set/${id}`,
  PAGE: (page: number) => `${apiBase.alarms}/${page}`,
  CHECK_ID: (id: string) => `${apiBase.alarms}/check/${id}`,
  DELETE: `${apiBase.alarms}/delete`,
};

export const BOOKMARK = {
  BOOKMARK: apiBase.bookmark,
  LIST: `${apiBase.bookmark}/list`,
  ID: (id: string) => `${apiBase.bookmark}/${id}`,
};

export const PHARMACY = {
  PHARMACY: apiBase.pharmacy,
  SEARCH: `${apiBase.pharmacy}/search`,
  COUNT: `${apiBase.pharmacy}/count`,
};

export const PILLS = {
  SEARCH: `${apiBase.pills}/search`,
  BOOKMARK_ID: (id: string) => `${apiBase.pills}/bookmark/${id}`,
  RESULT_NAME: (name: string) => `${apiBase.pills}/result/${name}`,
};

export const NEXT_API = {
  VERIFY_CODE: `/api/verify-code`,
};
