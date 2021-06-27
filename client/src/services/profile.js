import api from './API';

export function getMyProfile() {
  return api.get('/api/v1/profile/me');  
}

export function createProfile(profile) {
  return api.post('/api/v1/profile', profile);
}
