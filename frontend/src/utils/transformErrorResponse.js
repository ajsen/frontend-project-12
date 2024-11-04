const networkErrorStatuses = {
  401: 'feedbackMessages.incorrectUsernameOrPassword',
  409: 'feedbackMessages.usernameTaken',
  500: 'feedbackMessages.internalServerError',
};

const networkErrorCodes = {
  ERR_NETWORK: 'feedbackMessages.networkError',
  ECONNABORTED: 'feedbackMessages.connectionTimeout',
};

const transformErrorResponse = ({ status, code }) => (status)
  ? networkErrorStatuses[status] ?? 'feedbackMessages.unknownError'
  : networkErrorCodes[code] ?? 'feedbackMessages.unknownError';

export default transformErrorResponse;
