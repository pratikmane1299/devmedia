import api from './API';

export function register(body) {
  return api.post('/api/v1/auth/register', body);  
}

export function login(body) {
  return api.post('/api/v1/auth/login', body);
}

export function fetchCurrentUser() {
  return api.get('/api/v1/auth');
}

export function fetchMyFollowing() {
  return api.get(`/api/v1/auth/my-following`);
}
