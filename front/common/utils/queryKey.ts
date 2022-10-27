/*
 * path: /messages
 */
export const messageKeys = {
  lists: ["messages"] as const,
  getMessages: (pageCount: number) =>
    [...messageKeys.lists, pageCount] as const,
};

/*
 * path: /account/email/find
 */
export const findEmailKeys = {
  verifyCode: (code: string) => ["verifyCode", code] as const,
};

/*
 * path: /search/pharmacy
 */
export const pharmKeys = {
  searchPharm: ["searchPharm"] as const,
};
