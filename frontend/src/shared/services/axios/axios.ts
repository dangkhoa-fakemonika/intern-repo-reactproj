import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API_URL;

export const axiosInstance = axios.create({
  baseURL : API_URL,
  // baseURL : "https://api.escuelajs.co/api/v1"
  // timeout : 1000,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },

})

axiosInstance.interceptors.request.use((config) => {
  const accessToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("access_token="))
    ?.split("=")[1];
  if (accessToken) {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

type RefreshTokenResponse = {
  access_token: string;
};

async function handleTokenRefresh(originalRequest: any) {
  const refreshToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("refresh_token="))
    ?.split("=")[1];
  if (refreshToken) {
    try {
      const response = await axios.post<RefreshTokenResponse>(`${API_URL}auth-jwt/refresh/`, {
        refresh_token: refreshToken,
      });
      const { access_token } = response.data;
      document.cookie = `access_token=${access_token}; path=/`;
      originalRequest.headers["Authorization"] = `Bearer ${access_token}`;
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      console.error("Làm mới token thất bại:", refreshError);
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
