import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api'
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('docker_panel_jwt');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('docker_panel_jwt');
      // Using browser native location to avoid tight router coupling
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
