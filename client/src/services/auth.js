import axios from 'axios';

axios.interceptors.request.use(function (config) {

  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

export function register(body) {
  return axios.post('/api/v1/auth/register', body);  
}

export function login(body) {
  return axios.post('/api/v1/auth/login', body);
}

export function fetchCurrentUser() {
  return axios.get('/api/v1/auth');
}
