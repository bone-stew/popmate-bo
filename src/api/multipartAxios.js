import baseAxios from 'axios';

export const baseURL = process.env.REACT_APP_API_BASE_URL;

const MultipartAxios = baseAxios.create({
  baseURL,
  headers: {
    'content-type': 'multipart/form-data',
  },
});

MultipartAxios.interceptors.request.use((config) => {
  const accessToken = sessionStorage.getItem('accessToken');
  config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : null;
  return config;
});

export default MultipartAxios;
