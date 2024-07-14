import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import Config from 'react-native-config';
import AsyncStore from '../asyncStorage';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: Config.PEERLY_API_BASE_URL,
  headers: {
    'Accept-Version': 'application/vnd.peerly.v1',
    'Content-Type': 'application/json',
  },
});

import {PEERLY_LOGIN_ROUTE} from '../../constant/apiRoutes';
import {PeerlyLoginResponse} from './types';

export const apiCall = async <T, D>(config: AxiosRequestConfig<T>) => {
  let authToken: string | null;
  if (config.url === PEERLY_LOGIN_ROUTE) {
    authToken = await AsyncStore.getItem(AsyncStore.AUTH_TOKEN_KEY);
    // Temporary hardcoaded the token once all API integration complete we will remove it.
    config.headers = {
      'Intranet-Auth':
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo5Mjl9.6zCALizV0v58UmaJIZ16i1ASULyks6uCj8ubcRrH3dU',
    };
  } else {
    authToken = await AsyncStore.getItem(AsyncStore.PEERLY_AUTH_TOKEN_KEY);
    const authorizationHeader = authToken;

    if (config.headers) {
      config.headers.Authorization = authorizationHeader;
    } else {
      config.headers = {
        Authorization: authorizationHeader,
      };
    }
  }
  const response = await axiosInstance.request<D>(config);
  return response;
};

export const loginPeerly = async () => {
  const response = await apiCall<any, PeerlyLoginResponse>({
    method: 'GET',
    url: PEERLY_LOGIN_ROUTE,
  });
  return response.data;
};
