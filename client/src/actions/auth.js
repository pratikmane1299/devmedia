import { register, login, fetchCurrentUser } from '../services/auth';
import { CLEAR_PROFILE } from './profile';

export const REGISTER_BEGIN = 'REGISTER_BEGIN';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const LOGIN_BEGIN = 'LOGIN_BEGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const FETCH_CURRENT_USER_BEGIN = 'FETCH_CURRENT_USER_BEGIN';
export const FETCH_CURRENT_USER_SUCCESS = 'FETCH_CURRENT_USER_SUCCESS';
export const FETCH_CURRENT_USER_FAILURE = 'FETCH_CURRENT_USER_FAILURE'; 
export const LOGOUT = 'LOGOUT';
export const ACCOUNT_DELETED = 'ACCOUNT_DELETED';

export function registerBegin() {
  return { type: REGISTER_BEGIN, payload: null };
}

export function registerSuccess(token) {
  return { type: REGISTER_SUCCESS, payload: token };
}

export function registerFailure() {
  return { type: REGISTER_FAIL, payload: null };
}

export function loginBegin() {
  return { type: LOGIN_BEGIN, payload: null };
}

export function loginSuccess(token) {
  return { type: LOGIN_SUCCESS, payload: token };
}

export function loginFailure() {
  return { type: LOGIN_FAIL, payload: null };
}

export function registerAction(body) {
  return async (dispatch) => {
    dispatch({ type: REGISTER_BEGIN, payload: null });
    return register(body)
      .then(res => {
        dispatch({ type: REGISTER_SUCCESS, payload: res.data.token });
      })
      .catch(error => {
        throw(error);
       });
  }
}

export function loginAction(body) {
  return async (dispatch) => {

    dispatch({ type: LOGIN_BEGIN, payload: null });

    return login(body)
      .then(res => {
        dispatch({ type: LOGIN_SUCCESS, payload: res.data.token });
      })
      .catch(error => {
        //dispatch({ type: LOGIN_FAIL, payload: null });
        throw(error);
       });

    // return login(body)
    //   .then(res => res.data)
    //   .catch(error => {
    //     throw(error);
    //   })
  }
}

export function fetchCurrentUserAction() {
  return (dispatch) => {

    dispatch({ type: FETCH_CURRENT_USER_BEGIN, payload: null });
    return fetchCurrentUser()
      .then(res => {
        dispatch({ type: FETCH_CURRENT_USER_SUCCESS, payload: res.data });
      })
      .catch(error => {
        dispatch({ type: FETCH_CURRENT_USER_FAILURE, payload: null });
        throw(error);
      });
  }
}

export function logout() {
  return {
    type: LOGOUT, payload: null,
  };
}

export function logoutAction() {
  return (dispatch) => {
    dispatch({
      type: LOGOUT, payload: null,
    });

    dispatch({ type: CLEAR_PROFILE, payload: null });
  }
}