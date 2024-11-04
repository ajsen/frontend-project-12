import { createApi } from '@reduxjs/toolkit/query/react';

import axiosBaseQuery from './axiosBaseQuery';
import { apiBaseUrl } from './apiPaths';

const getAuthHeader = () => {
  const userAuthData = JSON.parse(localStorage.getItem('userAuthData'));
  return userAuthData?.token ? { Authorization: `Bearer ${userAuthData.token}` } : {};
};

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({
    baseUrl: apiBaseUrl,
    prepareHeaders: (headers) => {
      const authHeader = getAuthHeader();
      if (authHeader.Authorization) {
        headers = { ...headers, ...authHeader };
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});

export default apiSlice;
