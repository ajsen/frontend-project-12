import axios from 'axios';

const axiosInstance = axios.create({
  timeout: 2000,
});

const getAuthHeader = () => {
  const credentials = JSON.parse(localStorage.getItem('credentials'));
  return credentials?.token ? { Authorization: `Bearer ${credentials.token}` } : {}
};

axiosInstance.interceptors.request.use(
  (config) => {
    const authHeader = getAuthHeader();
    if (authHeader.Authorization) {
      config.headers = {
        ...config.headers,
        ...authHeader,
      };
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export default axiosInstance;
