import api from './API';

export function getMyProfile() {
  return api.get('/api/v1/profile/me');  
}

