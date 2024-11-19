import { isAxiosError } from 'axios';

import axiosInstance from '../utils/axiosInstance';

const defaultArgs = {
  baseUrl: '',
};

const prepareRequestConfig = (baseUrl, requestConfig) => {
  const url = typeof requestConfig === 'string'
    ? [baseUrl, requestConfig].join('/')
    : [baseUrl, requestConfig.url].join('/');
  return { ...requestConfig, url };
};

const axiosBaseQuery = ({ baseUrl, prepareHeaders } = defaultArgs) => async (requestConfig) => {
  try {
    const preparedRequestConfig = prepareRequestConfig(baseUrl, requestConfig);
    const preparedHeaders = prepareHeaders
      ? prepareHeaders(preparedRequestConfig.headers || {})
      : preparedRequestConfig.headers;

    const result = await axiosInstance({ ...preparedRequestConfig, headers: preparedHeaders });

    return { data: result.data };
  } catch (err) {
    if (!isAxiosError(err)) {
      return { error: err };
    }

    return {
      error: {
        status: err.status ?? null,
        code: err.code ?? null,
      },
    };
  }
};

export default axiosBaseQuery;
