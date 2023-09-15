import baseAxios from 'axios';

export const baseURL = process.env.REACT_APP_API_BASE_URL;

const JsonAxios = baseAxios.create({
  baseURL,
  headers: {
    'content-type': 'application/json',
  },
});

JsonAxios.interceptors.request.use((config) => {
  const accessToken = sessionStorage.getItem('accessToken');
  config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : null;
  return config;
});

export default JsonAxios;
