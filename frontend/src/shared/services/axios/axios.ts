import axios from 'axios';
import {store} from "@/shared/stores/store.ts";
import {updateAccessToken} from "@/shared/stores/states/user.ts";
import {waitForRehydration} from "@/shared/helpers/wait-for-rehydration.ts";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const axiosInstance = axios.create({
  baseURL : API_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },

})

axiosInstance.interceptors.request.use((config) => {
  const accessToken = store.getState().user.access_token;
  if (accessToken) {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});


async function handleTokenRefresh(originalRequest: Axios.AxiosXHRConfig<unknown> ) {
  await waitForRehydration();
  const refreshToken = store.getState().user.refresh_token;
  if (refreshToken && originalRequest && originalRequest.headers) {
    try {
      const response = await axiosInstance.post<{access_token : string}>("auth/refresh-token/", {
        refreshToken: refreshToken,
      });
      const { access_token } = response.data;
      store.dispatch(updateAccessToken(access_token));
      originalRequest.headers["Authorization"] = `Bearer ${access_token}`;
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      console.error("Refresh token failed", refreshError);
      window.location.href = "/login";
      return Promise.reject(refreshError);
    }
  }
  return Promise.reject(new Error("No refresh token found"));
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; 
      return handleTokenRefresh(originalRequest);
    }
    return Promise.reject(error);
  }
);
