import handleNetworkError from './handleNetworkError';

const transformErrorResponse = (error) => handleNetworkError({
  status: error.status ?? null,
  code: error.code ?? null,
});

export default transformErrorResponse;
