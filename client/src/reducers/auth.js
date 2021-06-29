import {
  REGISTER_BEGIN,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_BEGIN,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  FETCH_CURRENT_USER_BEGIN,
  FETCH_CURRENT_USER_SUCCESS,
  FETCH_CURRENT_USER_FAILURE,
  LOGOUT,
  ACCOUNT_DELETED,
} from '../actions/auth';

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: false,
  user: null,
};

export default function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_BEGIN:
    case LOGIN_BEGIN:
    case FETCH_CURRENT_USER_BEGIN:
      return { ...state, loading: true };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload);
      return {
        ...state,
        token: payload,
        isAuthenticated: true,
        loading: false,
      };

    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case FETCH_CURRENT_USER_FAILURE:
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem('token');
      return { ...state, isAuthenticated: false, loading: false, token: null, user: null };
    
    case FETCH_CURRENT_USER_SUCCESS:
      return { ...state, loading: false, isAuthenticated: true, user: payload };

    default:
      return state;
  }
}
