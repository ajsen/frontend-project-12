import buildUrl from '../utils/urlBuilder';

export const apiBaseUrl = 'api/v1';

const apiPaths = {
  login: () => buildUrl(apiBaseUrl, 'login'),
  signup: () => buildUrl(apiBaseUrl, 'signup'),
  channels: () => 'channels',
  messages: () => 'messages',
  channel: (id) => buildUrl(apiPaths.channels(), id),
  message: (id) => buildUrl(apiPaths.messages(), id),
};

export default apiPaths;
