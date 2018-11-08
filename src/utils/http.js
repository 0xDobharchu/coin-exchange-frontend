import axios from 'axios';
import { API_BASE } from '../resources/constant';

const instance = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

// Add a response interceptor
instance.interceptors.response.use(
  function(response) {
    try {
      const { data } = response;
      console.info('Response', response);
      return data;
    } catch (e) {
      return null;
    }
  },
  function(error) {
    try {
      const { response } = error;
      console.warn('Response error', error);
      return Promise.reject({
        error: true,
        code: error?.code,
        status: response?.status,
        data: response?.data,
      });
    } catch (e) {
      return Promise.reject(null);
    }
  },
);

export default instance;
