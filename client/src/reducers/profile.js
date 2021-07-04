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
} from '../actions/profile';

const initialState = {
  me: null,
  profiles: [],
  repos: [],
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
      return { ...state, loading: false };

    case UPDATE_PROFILE:
      return { ...state, loading: false, me: payload };
    
    case FETCH_PROFILES_SUCCESS:
      return { ...state, loading: false, profiles: payload };
    
    case FETCH_PROFILES_ERROR:
      return { ...state, loading: false, profiles: [] };

    default:
      return state;
  }
}
