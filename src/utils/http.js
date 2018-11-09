import axios from 'axios';
import { API_BASE } from '../resources/constant';

const instance = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    try {
      const { data } = response;
      console.info('Response', response);
      return data;
    } catch (e) {
      return null;
    }
  },
  (error) => {
    try {
      const { response } = error;
      console.warn('Response error', error);
      return Promise.reject({
        error: true,
        status: response?.status,
        data: response?.data,
        statusText: response?.statusText,
      });
    } catch (e) {
      return Promise.reject(e);
    }
  },
);

export default instance;
