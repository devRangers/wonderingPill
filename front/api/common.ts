export const putImageOnGCS = (url: string, file: File) => {
  return fetch(url, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": "application/octet-stream",
    },
  });
};
