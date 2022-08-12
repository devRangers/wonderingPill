const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const get = (endpoint: string) => {
  const url = baseUrl + endpoint;

  return fetch(url, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
};

const post = <T>(endpoint: string, data: T) => {
  const url = baseUrl + endpoint;

  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
};

const put = <T>(endpoint: string, data: T) => {
  const url = baseUrl + endpoint;

  return fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
};

const del = (endpoint: string) => {
  const url = baseUrl + endpoint;

  return fetch(url, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
};

export { get, post, put, del as delete };
