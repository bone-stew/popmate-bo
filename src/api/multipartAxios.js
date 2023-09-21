import baseAxios from 'axios';

export const baseURL = process.env.REACT_APP_API_BASE_URL;

const MultipartAxios = baseAxios.create({
  baseURL,
  headers: {
    'content-type': 'multipart/form-data',
  },
});

MultipartAxios.interceptors.request.use((config) => {
  // const accessToken = sessionStorage.getItem('accessToken');
  const accessToken =
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYW5nY2hvNjE3QGdtYWlsLmNvbSIsInVzZXJJZCI6NCwidXNlck5hbWUiOiLsobDsg4Hsm5AiLCJpYXQiOjE2OTQ0MTIyMjUsImV4cCI6MTY5NzAwMzU4N30.lvNMG3HRmODWotnAwyiBAXiBd8VEbR7Hs0H2Xjyj_wk';
  config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : null;
  return config;
});

export default MultipartAxios;
