import { createApi } from '@reduxjs/toolkit/query/react';

import axiosBaseQuery from './axiosBaseQuery';
import { api } from './apiPaths';

const getAuthHeader = (token) => (token ? { Authorization: `Bearer ${token}` } : {});

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({
    baseUrl: api,
    prepareHeaders: (headers, { getState }) => {
      const { auth: { token } } = getState();
      const authHeader = getAuthHeader(token);
      return (authHeader.Authorization)
        ? { ...headers, ...authHeader }
        : headers;
    },
  }),
  tagTypes: ['Channels'],
  endpoints: () => ({}),
});

export default apiSlice;
