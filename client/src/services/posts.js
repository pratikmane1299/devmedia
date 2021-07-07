import api from './API';

export function fetchAllPosts() {
  return api.get('/api/v1/posts');
}
