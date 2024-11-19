const separator = '/';
const apiVersion = 'v1';
export const api = `api/${apiVersion}`;

const apiPaths = {
  getLogin: () => [api, 'login'].join(separator),
  getSignup: () => [api, 'signup'].join(separator),
  getChannels: () => 'channels',
  getMessages: () => 'messages',
  getChannel: (id) => ['channels', id].join(separator),
  getMessage: (id) => ['channels', id].join(separator),
};

export default apiPaths;
