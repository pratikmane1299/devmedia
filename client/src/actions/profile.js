import { createProfile, getMyProfile } from "../services/profile";

export const FETCH_MY_PROFILE_BEGIN = 'FETCH_MY_PROFILE_BEGIN';
export const FETCH_MY_PROFILE_SUCCESS = 'FETCH_MY_PROFILE_SUCCESS';
export const FETCH_MY_PROFILE_FAILURE = 'FETCH_MY_PROFILE_FAILURE';
export const CREATE_PROFILE_BEGIN = 'CREATE_PROFILE_BEGIN';
export const CREATE_PROFILE_ERROR = 'CREATE_PROFILE_ERROR';
export const CLEAR_PROFILE = 'CLEAR_PROFILE';

export function getMyProfileAction() {
  return (dispatch) => {
    dispatch({ type: FETCH_MY_PROFILE_BEGIN, payload: null });

    return getMyProfile()
      .then(res => {
        dispatch({ type: FETCH_MY_PROFILE_SUCCESS, payload: res.data });
        return res.data;
      })
      .catch(error => {
        dispatch({ type: FETCH_MY_PROFILE_FAILURE, payload: null });
        throw(error);
      });
  }
}

export function createProfileAction(profile) {
  return (dispatch) => {
    dispatch({ type: CREATE_PROFILE_BEGIN, payload: null });

    return createProfile(profile)
      .then(res => {
        dispatch({ type: FETCH_MY_PROFILE_SUCCESS, payload: res.data });
      })
      .catch(error => {
        dispatch({ type: CREATE_PROFILE_ERROR, payload: null });
        throw(error);
      });
  }
}
