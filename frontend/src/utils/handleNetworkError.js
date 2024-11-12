const unknownError = 'feedbackMessages.unknownError';

const messagesByStatus = {
  401: 'feedbackMessages.incorrectUsernameOrPassword',
  409: 'feedbackMessages.usernameTaken',
  500: 'feedbackMessages.internalServerError',
};

const messagesByCode = {
  ERR_NETWORK: 'feedbackMessages.networkError',
  ECONNABORTED: 'feedbackMessages.connectionTimeout',
};

const handleNetworkError = ({ status, code }) => ((status)
  ? messagesByStatus[status] ?? unknownError
  : messagesByCode[code] ?? unknownError);

export default handleNetworkError;
