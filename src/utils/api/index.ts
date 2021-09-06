import axios, { AxiosError, AxiosRequestConfig } from "axios";

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
      baseURL: process.env.REACT_APP_API_BASE_URL,
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
