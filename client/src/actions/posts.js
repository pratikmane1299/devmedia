import { fetchAllPosts, addPost } from "../services/posts";

export const FETCH_ALL_POSTS_BEGIN = 'FETCH_ALL_POSTS_BEGIN'
export const FETCH_ALL_POSTS_SUCCESS = 'FETCH_ALL_POSTS_SUCCESS';
export const FETCH_ALL_POSTS_FAILURE = 'FETCH_ALL_POSTS_FAILURE';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';

export function fetchAllPostsAction() {
  return async (dispatch) => {
    dispatch({ type: FETCH_ALL_POSTS_BEGIN, payload: null });

    try {
      const { data } = await fetchAllPosts();

      dispatch({ type: FETCH_ALL_POSTS_SUCCESS, payload: data });

    } catch(error) {
      dispatch({ type: FETCH_ALL_POSTS_FAILURE });
    }
  }
}

export function addNewPostAction(post) {
  return async (dispatch) => {
    return addPost(post)
      .then(res => {
        dispatch({ type:  ADD_POST_SUCCESS, payload: res.data });
      })
      .catch(error => {
        throw(error);
      });
  }
}
