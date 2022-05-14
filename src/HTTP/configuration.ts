import axios from 'axios';

export const instanceAxios = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  timeout: 5000,
});

instanceAxios.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return config;
});
