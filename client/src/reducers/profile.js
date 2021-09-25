import {
  ADD_EDUCATION_BEGIN,
  ADD_EDUCATION_ERROR,
  ADD_EXPERIENCE_BEGIN,
  ADD_EXPERIENCE_ERROR,
  CLEAR_PROFILE,
  CREATE_PROFILE_BEGIN,
  CREATE_PROFILE_ERROR,
  DELETE_EDUCATION_ERROR,
  DELETE_EXPERIENCE_ERROR,
  FETCH_MY_PROFILE_BEGIN,
  FETCH_MY_PROFILE_FAILURE,
  FETCH_MY_PROFILE_SUCCESS,
  UPDATE_PROFILE,
  FETCH_PROFILES_BEGIN,
  FETCH_PROFILES_SUCCESS,
  FETCH_PROFILES_ERROR,
  FETCH_SINGLE_PROFILE_BEGIN,
  FETCH_SINGLE_PROFILE_SUCCESS,
  FETCH_SINGLE_PROFILE_ERROR,
  FOLLOW_USER_SUCCESS,
  FETCH_USERS_POSTS_SUCCESS,
  FETCH_MY_FOLLOWING_SUCCESS,
  ADD_EDUCATION_SUCCESS,
  ADD_EXPERIENCE_SUCCESS,
  FOLLOW_USER_IN_PROFILE_SUCCESS,
  FETCH_FOLLOWING_BEGIN,
  FETCH_FOLLOWING_ERROR,
  FETCH_FOLLOWING_SUCCESS,
  FETCH_FOLLOWERS_BEGIN,
  FETCH_FOLLOWERS_ERROR,
  FETCH_FOLLOWERS_SUCCESS,
  FOLLOW_USER_IN_FOLLOWING_SUCCESS,
  FOLLOW_USER_IN_FOLLOWERS_SUCCESS,
} from '../actions/profile';

import {
  DELETE_POST_SUCCESS,
} from '../actions/posts';

const initialState = {
  me: null,
  profiles: [],
  profile: null,
  repos: [],
  posts: [],
  myFollowing: [],
  following: [],
  followers: [],
  loading: false,
};

export default function profileReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_MY_PROFILE_BEGIN:
    case CREATE_PROFILE_BEGIN:
    case ADD_EXPERIENCE_BEGIN:
    case ADD_EDUCATION_BEGIN:
    case FETCH_PROFILES_BEGIN:
    case FETCH_SINGLE_PROFILE_BEGIN:
    case FETCH_FOLLOWING_BEGIN:
    case FETCH_FOLLOWERS_BEGIN:
      return { ...state, loading: true };

    case FETCH_MY_PROFILE_SUCCESS:
      return { ...state, loading: false, me: payload };

    case FETCH_MY_PROFILE_FAILURE:
    case CREATE_PROFILE_ERROR:
      return { ...state, loading: false, me: null };

    case CLEAR_PROFILE:
      return { ...state, me: null };

    case ADD_EXPERIENCE_ERROR:
    case ADD_EDUCATION_ERROR:
    case DELETE_EXPERIENCE_ERROR:
    case DELETE_EDUCATION_ERROR:
    case FETCH_FOLLOWING_ERROR:
    case FETCH_FOLLOWERS_ERROR:
      return { ...state, loading: false };

    case UPDATE_PROFILE:
      return { ...state, loading: false, profile: payload };

    case FETCH_PROFILES_SUCCESS:
      return { ...state, loading: false, profiles: payload };

    case FETCH_SINGLE_PROFILE_SUCCESS:
      return { ...state, loading: false, profile: payload };

    case FOLLOW_USER_SUCCESS:
      const updatedPofiles = state.profiles.map((profile) => {
        if (profile.user._id === payload.userId) {
          return { ...profile, isFollowedByViewer: payload.followed };
        } else return profile;
      });

      return { ...state, profiles: updatedPofiles };

    case FETCH_USERS_POSTS_SUCCESS:
      return { ...state, posts: payload };

    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
      };

    case ADD_EDUCATION_SUCCESS:
      const myProfile = { ...state.profile, education: payload };

      return { ...state, profile: myProfile };

    case ADD_EXPERIENCE_SUCCESS:
      const profile = { ...state.profile, experience: payload };
      return { ...state, profile: profile };

    case FOLLOW_USER_IN_PROFILE_SUCCESS:
      const newProfile = {
        ...state.profile,
        isFollowedByViewer: payload.followed,
      };
      return { ...state, profile: newProfile };

    case FETCH_MY_FOLLOWING_SUCCESS:
      return { ...state, myFollowing: payload };

    case FETCH_FOLLOWING_SUCCESS:
      return { ...state, loading: false, following: payload };

    case FETCH_FOLLOWERS_SUCCESS:
      return { ...state, loading: false, followers: payload };
    
    case FOLLOW_USER_IN_FOLLOWING_SUCCESS:
      const updatedFollowing = state.following.map((profile) => {
        if (profile.user._id === payload.userId) {
          return { ...profile, isFollowedByViewer: payload.followed };
        } else return profile;
      });

      return { ...state, following: updatedFollowing };

    case FOLLOW_USER_IN_FOLLOWERS_SUCCESS:
      const updatedFollowers = state.followers.map((profile) => {
        if (profile.user._id === payload.userId) {
          return { ...profile, isFollowedByViewer: payload.followed };
        } else return profile;
      });

      return { ...state, followers: updatedFollowers };

    case FETCH_PROFILES_ERROR:
      return { ...state, loading: false, profiles: [] };

    case FETCH_SINGLE_PROFILE_ERROR:
      return { ...state, loading: false, profile: null };

    default:
      return state;
  }
}
