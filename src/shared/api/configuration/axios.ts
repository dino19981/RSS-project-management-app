import axios from 'axios';
import { responseStatus } from 'const/responseStatus';
import { AppRoute } from 'const/routes';

export const instanceAxios = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  timeout: 10000,
});

instanceAxios.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return config;
});

instanceAxios.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    if (error.response.status === responseStatus.UNAUTHORIZE) {
      localStorage.removeItem('token');
      window.location.replace(AppRoute.WELCOME_PAGE);
    } else {
      throw error;
    }
  }
);
