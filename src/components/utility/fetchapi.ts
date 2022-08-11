// const requestHeaders: HeadersInit = new Headers();
// requestHeaders.set("Content-Type", "application/json");
// requestHeaders.set("Authorization", localStorage.getItem("token") || "");

export const fetchapi = {
  get: async (url: string, requestHeaders: HeadersInit): Promise<Response> => {
    const result = await fetch(url, { headers: requestHeaders });
    return result;
  },
  post: async <T>(
    url: string,
    parameter: T,
    requestHeaders: HeadersInit
  ): Promise<Response> => {
    const result = fetch(url, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(parameter),
    });
    return result;
  },
  delete: async (
    url: string,
    requestHeaders: HeadersInit
  ): Promise<Response> => {
    const result = fetch(url, { method: "DELETE", headers: requestHeaders });
    return result;
  },
  put: async <T>(
    url: string,
    parameter: T,
    requestHeaders: HeadersInit
  ): Promise<Response> => {
    const result = fetch(url, {
      method: "PUT",
      headers: requestHeaders,
      body: JSON.stringify(parameter),
    });
    return result;
  },
  create: async <T>(
    url: string,
    parameter: T,
    requestHeaders: HeadersInit
  ): Promise<Response> => {
    const result = fetch(url, {
      method: "",
      headers: requestHeaders,
      body: JSON.stringify(parameter),
    });
    return result;
  },
};
