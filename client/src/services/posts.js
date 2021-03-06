import api from './API';

export function fetchAllPosts() {
  return api.get('/api/v1/posts');
}

export function addPost(post) {
  return api.post('/api/v1/posts', post);
}

export function deletePost(id) {
  return api.delete(`/api/v1/posts/${id}`);
}

export function likeUnLikePost(postId) {
  return api.put(`/api/v1/posts/${postId}/likeUnLike`);
}

export function addComment(postId, comment) {
  return api.post(`/api/v1/posts/${postId}/add-comment`, comment);
}

export function fetchUsersPosts(userId) {
  return api.get(`/api/v1/users/${userId}/posts`);
}