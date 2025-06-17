import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API_URL;

export const axiosInstance = axios.create({
  baseURL : API_URL,
  // baseURL : "https://api.escuelajs.co/api/v1"
  // timeout : 1000,

})
