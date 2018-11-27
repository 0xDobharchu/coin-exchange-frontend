import axios from 'axios';
import { API_BASE, API_URL } from 'src/resources/constants/url';
import authentication from 'src/utils/authentication';

let isAlreadyFetchingAccessToken = false;
let subscribers = [];

function onAccessTokenFetched(access_token) {
  subscribers = subscribers.filter(callback => callback(access_token));
}

function addSubscriber(callback) {
  subscribers.push(callback);
}
function fetchAccessToken() {
  const options = {
    url: API_URL.USER.USER_TOKEN_REFRESH,
    method: 'POST',
    data: {'refresh': authentication.getRefreshToken()}
  };
  return instance(options);
}
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

const instance = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  crossDomain: true,
  headers
});

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    try {
      const { data } = response;
      return data;
    } catch (e) {
      return null;
    }
  },
  (error) => {
    try {
      if(error && error.response){
        const { config, response: { status, data, statusText } } = error;
        const originalRequest = config;
        if (status === 401) {
          if (!isAlreadyFetchingAccessToken) {
            isAlreadyFetchingAccessToken = true;
            fetchAccessToken().then((data) => {
              isAlreadyFetchingAccessToken = false;
              onAccessTokenFetched(data.access);
              authentication.setAccessToken(data.access);
            });
          }

          const retryOriginalRequest = new Promise((resolve) => {
            addSubscriber(access_token => {
              originalRequest.headers.Authorization = 'Bearer ' + access_token;
              resolve(instance(originalRequest));
            });
          });
          return retryOriginalRequest;
        }
        console.warn('Response error', error);
        return Promise.reject({
          error: true,
          status: status,
          data: data,
          statusText: statusText,
        });
      }
    } catch (e) {
      return Promise.reject(e);
    }
  },
);

export default instance;
