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

export function fetchDevelopers() {
  return api.get('/api/v1/profile/developers');
}

export function fetchSingleProfile(id) {
  return api.get(`/api/v1/profile/${id}`);
}

export function followUser(userId) {
  return api.put(`/api/v1/profile/${userId}/followUnFollowUser`);
}

export function fetchUsersFollowing(userId) {
  return api.get(`/api/v1/profile/${userId}/following`);
}

export function fetchUserFollowers(userId) {
  return api.get(`/api/v1/profile/${userId}/followers`);
}
