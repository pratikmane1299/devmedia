import { ADD_EXPERIENCE_BEGIN, ADD_EXPERIENCE_ERROR, CLEAR_PROFILE, CREATE_PROFILE_BEGIN, CREATE_PROFILE_ERROR, FETCH_MY_PROFILE_BEGIN, FETCH_MY_PROFILE_FAILURE, FETCH_MY_PROFILE_SUCCESS } from "../actions/profile";

const initialState = {
  me: null,
  profiles: [],
  repos: [],
  loading: false,
}

export default function profileReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_MY_PROFILE_BEGIN:
    case CREATE_PROFILE_BEGIN:
    case ADD_EXPERIENCE_BEGIN:
      return { ...state, loading: true };

    case FETCH_MY_PROFILE_SUCCESS:
      return { ...state, loading: false, me: payload };

    case FETCH_MY_PROFILE_FAILURE:
    case CREATE_PROFILE_ERROR:
      return { ...state, loading: false, me: null };

    case CLEAR_PROFILE:
      return { ...state, me: null };

    case ADD_EXPERIENCE_ERROR:
      return { ...state, loading: false };

    default:
      return state;
  }
}