import {
  fetchAllPosts,
  addPost,
  deletePost,
  likeUnLikePost,
} from '../services/posts';
import { setAlert } from './alert';

export const FETCH_ALL_POSTS_BEGIN = 'FETCH_ALL_POSTS_BEGIN';
export const FETCH_ALL_POSTS_SUCCESS = 'FETCH_ALL_POSTS_SUCCESS';
export const FETCH_ALL_POSTS_FAILURE = 'FETCH_ALL_POSTS_FAILURE';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const UPDATE_LIKES = 'UPDATE_LIKES';

export function fetchAllPostsAction() {
  return async (dispatch) => {
    dispatch({ type: FETCH_ALL_POSTS_BEGIN, payload: null });

    try {
      const { data } = await fetchAllPosts();

      dispatch({ type: FETCH_ALL_POSTS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_ALL_POSTS_FAILURE });
    }
  };
}

export function addNewPostAction(post) {
  return async (dispatch) => {
    return addPost(post)
      .then((res) => {
        dispatch({ type: ADD_POST_SUCCESS, payload: res.data });
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function deletePostAction(postId) {
  return async (dispatch) => {
    return deletePost(postId)
      .then((res) => {
        dispatch({ type: DELETE_POST_SUCCESS, payload: res.data._id });
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function likeUnLikeAction(postId) {
  return async (dispatch) => {
    return likeUnLikePost(postId)
      .then((res) => {
        dispatch({
          type: UPDATE_LIKES,
          payload: { id: postId, likes: res.data.likes },
        });
      })
      .catch((error) => {
        setAlert(error.response.status.statusText, "danger");
      });
  };
}
