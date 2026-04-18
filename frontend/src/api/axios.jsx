import axios from 'axios';

// For Create React App (CRA), environment variables must start with REACT_APP_
// You can learn more about this in the CRA docs: https://create-react-app.dev/docs/adding-custom-environment-variables/
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const instance = axios.create({
  baseURL: API_URL,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;