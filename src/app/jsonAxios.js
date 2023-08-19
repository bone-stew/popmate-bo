import baseAxios from 'axios';

export const baseURL = process.env.REACT_APP_API_BASE_URL;

const Axios = baseAxios.create({
  baseURL,
  headers: {
    'content-type': 'application/json',
  },
});

export default Axios;
