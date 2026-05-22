import axios from 'axios';

/*
 * In production deployments, we cannot hardcode 'localhost' URLs because the browser
 * will attempt to reach localhost on the user's local machine, not the remote server.
 *
 * To fix this, we use an environment variable (e.g. VITE_API_URL) which can be set
 * to the production backend's domain. If it is not set, we use a fallback relative
 * origin URL. Relative URLs or proxy configurations let the network route the request
 * correctly on the same domain, avoiding CORS and unreachable host errors.
 */
const baseURL = (typeof process !== 'undefined' && process.env && process.env.VITE_API_URL) 
  || (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL)
  || (typeof window !== 'undefined' ? window.location.origin + '/api' : '/api');

const apiClient = axios.create({
  baseURL
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
