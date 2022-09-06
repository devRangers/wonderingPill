interface Response {
  statusCode: number;
  message: string;
}

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const get = async <T extends Response>(endpoint: string) => {
  const url = baseUrl + endpoint;

  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  const result: T = await res.json();

  if (result.statusCode >= 400) throw new Error(result.message);
  return result;
};

const post = async <T extends Response, U>(endpoint: string, data: U) => {
  const url = baseUrl + endpoint;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  const result: T = await res.json();

  if (result.statusCode >= 400) throw new Error(result.message);
  return result;
};

const put = async <T extends Response, U>(endpoint: string, data: U) => {
  const url = baseUrl + endpoint;

  const res = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  const result: T = await res.json();

  if (result.statusCode >= 400) throw new Error(result.message);
  return result;
};

const del = async <T extends Response>(endpoint: string) => {
  const url = baseUrl + endpoint;

  const res = await fetch(url, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  const result: T = await res.json();

  if (result.statusCode >= 400) throw new Error(result.message);
  return result;
};

const patch = async <T extends Response, U>(endpoint: string) => {
  const url = baseUrl + endpoint;

  const res = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  const result: T = await res.json();

  if (result.statusCode >= 400) throw new Error(result.message);
  return result;
};

export { get, post, put, del as delete, patch };
