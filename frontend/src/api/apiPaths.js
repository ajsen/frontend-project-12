const separator = '/';
const apiVersion = 'v1';
export const apiBaseUrl = ['api', apiVersion].join('/');

const apiPaths = {
  login: () => [apiBaseUrl, 'login'].join(separator),
  signup: () => [apiBaseUrl, 'signup'].join(separator),
  channels: () => 'channels',
  messages: () => 'messages',
  channel: (id) => [apiPaths.channels(), id].join(separator),
  message: (id) => [apiPaths.messages(), id].join(separator),
};

export default apiPaths;
