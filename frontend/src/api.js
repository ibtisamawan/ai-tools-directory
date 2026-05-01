import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

const cache = new Map();

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Simple in-memory cache for GET requests
  if (config.method === 'get') {
    const cachedData = cache.get(config.url + JSON.stringify(config.params || {}));
    if (cachedData) {
      config.adapter = () => Promise.resolve({
        data: cachedData,
        status: 200,
        statusText: 'OK',
        headers: config.headers,
        config: config,
      });
    }
  }
  return config;
});

API.interceptors.response.use((response) => {
  if (response.config.method === 'get') {
    cache.set(response.config.url + JSON.stringify(response.config.params || {}), response.data);
  }
  return response;
});

export default API;
