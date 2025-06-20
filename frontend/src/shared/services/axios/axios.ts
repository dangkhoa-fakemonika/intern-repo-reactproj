import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API_URL;

export const axiosInstance = axios.create({
  baseURL : API_URL,
  // baseURL : "https://api.escuelajs.co/api/v1"
  // timeout : 1000,

})


axiosInstance.interceptors.request.use(
  (config) => {
    console.log(config);
    return config;
  }
)

axiosInstance.interceptors.response.use(
  (result) => {
    console.log(result);
    return result;
  }
)
