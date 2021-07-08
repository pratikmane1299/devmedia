import api from './API';

export function fetchAllPosts() {
  return api.get('/api/v1/posts');
}

export function addPost(post) {
  return api.post('/api/v1/posts', post);
}
