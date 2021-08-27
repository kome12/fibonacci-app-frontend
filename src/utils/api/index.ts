import axios, { AxiosError, AxiosRequestConfig } from "axios";

export const baseURL = () => {
  // switch (process.env.NODE_ENV) {
  //   case "production":
  //     return "https://the-fibonacci-api.herokuapp.com/";
  //   case "test":
  //     return "https://the-fibonacci-api-staging.herokuapp.com/api/v1";
  //   case "development":
  //     return "http://localhost:3001/api/v1";
  // }
  return "https://the-fibonacci-api-staging.herokuapp.com/api/v1";
  // return "http://localhost:3001/api/v1";
};

export const clientBaseURL = () => {
  switch (process.env.NODE_ENV) {
    case "production":
      return "https://the-fibonacci-app.herokuapp.com/";
    case "test":
      return "https://the-fibonacci-app-staging.herokuapp.com/";
    case "development":
      return "http://localhost:3000";
  }
};

export type ApiResponse<T> =
  | {
      error: undefined;
      data: T;
    }
  | {
      error: AxiosError;
      data: undefined;
    };

async function request<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
  try {
    const res = await axios.request<T>({
      timeout: 10000,
      baseURL: baseURL(),
      // xsrfHeaderName: 'X-CSRF-Token',
      // withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // TODO: Gettings CORS issue when this is set. Will need to figure out after the MVP with the backend team
        // "Access-Control-Allow-Origin": clientBaseURL(),
      },
      responseType: "json",
      ...config,
    });
    return { error: undefined, data: res.data };
  } catch (error) {
    return { error, data: undefined };
  }
}

export const api = {
  get<R>(url: string, options?: AxiosRequestConfig) {
    return request<R>({ method: "get", url, ...options });
  },
  post<R>(url: string, data?: unknown) {
    return request<R>({ method: "post", url, data });
  },
  put<R>(url: string, data?: unknown) {
    return request<R>({ method: "put", url, data });
  },
};
