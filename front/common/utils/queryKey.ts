export const messageKeys = {
  lists: ["messages"] as const,
  getMessages: (pageCount: number) =>
    [...messageKeys.lists, pageCount] as const,
};
