import {
  FETCH_ALL_POSTS_BEGIN,
  FETCH_ALL_POSTS_SUCCESS,
  FETCH_ALL_POSTS_FAILURE,
  ADD_POST_SUCCESS,
  DELETE_POST_SUCCESS,
  UPDATE_LIKES,
  ADD_COMMENT,
} from '../actions/posts';

const initialState = {
  posts: [],
  post: null,
  loading: false,
};

export default function postsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_ALL_POSTS_BEGIN:
      return { ...state, loading: true };

    case FETCH_ALL_POSTS_SUCCESS:
      return { ...state, loading: false, posts: payload };

    case ADD_POST_SUCCESS:
      return { ...state, posts: [payload, ...state.posts] };

    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
      };

    case UPDATE_LIKES:
      const updatedPosts = state.posts.map((post) => {
        if (post._id === payload.id) {
          return {
            ...post,
            likes: payload.likes,
          };
        } else return post;
      });

      return { ...state, posts: updatedPosts };

    case ADD_COMMENT:
      const modifiedPosts = state.posts.map((post) => {
        if (post._id === payload.id) {
          return {
            ...post,
            comments: payload.comments,
          }
        } else return post;
      })
      return { ...state, posts: modifiedPosts };

    case FETCH_ALL_POSTS_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
}
