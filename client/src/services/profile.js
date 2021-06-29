import api from './API';

export function getMyProfile() {
  return api.get('/api/v1/profile/me');  
}

export function createProfile(profile) {
  return api.post('/api/v1/profile', profile);
}

export function addExperience(experience) {
  return api.put('/api/v1/profile/experience', experience);
}

export function addEducation(education) {
  return api.put('/api/v1/profile/education', education);
}

export function deleteExperience(id) {
  return api.delete(`/api/v1/profile/experience/${id}`);
}

export function deleteEducation(id) {
  return api.delete(`/api/v1/profile/education/${id}`);
}

export function deleteAccount() {
  return api.delete(`/api/v1/profile/`);
}

