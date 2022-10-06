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
  GOOGLE: "auth/google",
  GOOGLE_REDIRECT: "/auth/google-redirect",
  SEND_SMS: "/auth/send-sms",
  VERIFY_CODE: "/auth/verify-code",
  FIND_ACCOUNT: (id: string) => `find-account/${id}`,
};

export const USERS = {
  USERS_MYPAGE: "users/mypage",
  USERS_PRESIGNED_URL: "users/presigned-url",
  USERS_PROFILE_IMG: "users/profile-img",
  USERS_UPDATE: "users/update",
  USERS_DELETE: "users/delete",
  USERS_INQUIRY: "users/inquiry",
};
