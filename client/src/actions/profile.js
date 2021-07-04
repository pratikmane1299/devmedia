import {
  createProfile,
  getMyProfile,
  addExperience,
  addEducation,
  deleteExperience,
  deleteEducation,
  deleteAccount,
  fetchProfiles,
  fetchSingleProfile,
} from '../services/profile';
import { ACCOUNT_DELETED } from './auth';

export const FETCH_MY_PROFILE_BEGIN = "FETCH_MY_PROFILE_BEGIN";
export const FETCH_MY_PROFILE_SUCCESS = "FETCH_MY_PROFILE_SUCCESS";
export const FETCH_MY_PROFILE_FAILURE = "FETCH_MY_PROFILE_FAILURE";
export const CREATE_PROFILE_BEGIN = "CREATE_PROFILE_BEGIN";
export const CREATE_PROFILE_ERROR = "CREATE_PROFILE_ERROR";
export const CLEAR_PROFILE = "CLEAR_PROFILE";
export const ADD_EXPERIENCE_BEGIN = "ADD_EXPERIENCE_BEGIN";
export const ADD_EXPERIENCE_ERROR = "ADD_EXPERIENCE_ERROR";
export const UPDATE_PROFILE = "UPDATE_PROFILE";
export const ADD_EDUCATION_BEGIN = "ADD_EDUCATION_BEGIN";
export const ADD_EDUCATION_ERROR = "ADD_EDUCATION_ERROR";
export const DELETE_EXPERIENCE_BEGIN = "DELETE_EXPERIENCE_BEGIN";
export const DELETE_EXPERIENCE_ERROR = "DELETE_EXPERIENCE_ERROR";
export const DELETE_EDUCATION_ERROR = "DELETE_EDUCATION_ERROR";
export const FETCH_PROFILES_BEGIN = 'FETCH_PROFILES_BEGIN';
export const FETCH_PROFILES_SUCCESS =  'FETCH_PROFILES_SUCCESS';
export const FETCH_PROFILES_ERROR = 'FETCH_PROFILES_ERROR';
export const FETCH_SINGLE_PROFILE_BEGIN = 'FETCH_SINGLE_PROFILE_BEGIN';
export const FETCH_SINGLE_PROFILE_SUCCESS =  'FETCH_SINGLE_PROFILE_SUCCESS';
export const FETCH_SINGLE_PROFILE_ERROR = 'FETCH_SINGLE_PROFILE_ERROR';

export function getMyProfileAction() {
  return (dispatch) => {
    dispatch({ type: FETCH_MY_PROFILE_BEGIN, payload: null });

    return getMyProfile()
      .then((res) => {
        dispatch({ type: FETCH_MY_PROFILE_SUCCESS, payload: res.data });
        return res.data;
      })
      .catch((error) => {
        dispatch({ type: FETCH_MY_PROFILE_FAILURE, payload: null });
        throw error;
      });
  };
}

export function createProfileAction(profile) {
  return (dispatch) => {
    dispatch({ type: CREATE_PROFILE_BEGIN, payload: null });

    return createProfile(profile)
      .then((res) => {
        dispatch({ type: FETCH_MY_PROFILE_SUCCESS, payload: res.data });
      })
      .catch((error) => {
        dispatch({ type: CREATE_PROFILE_ERROR, payload: null });
        throw error;
      });
  };
}

export function addExperienceAction(experience) {
  return (dispatch) => {
    dispatch({ type: ADD_EXPERIENCE_BEGIN, payload: null });

    return addExperience(experience)
      .then((res) => {
        dispatch({ type: UPDATE_PROFILE, payload: res.data });
      })
      .catch((error) => {
        dispatch({ type: ADD_EXPERIENCE_ERROR, payload: null });
        throw error;
      });
  };
}

export function addEducationAction(education) {
  return (dispatch) => {
    dispatch({ type: ADD_EDUCATION_BEGIN, payload: null });

    return addEducation(education)
      .then((res) => {
        dispatch({ type: UPDATE_PROFILE, payload: res.data });
      })
      .catch((error) => {
        dispatch({ type: ADD_EDUCATION_ERROR, payload: null });
        throw error;
      });
  };
}

export function deleteExperienceAction(id) {
  return (dispatch) => {
    return deleteExperience(id)
      .then((res) => {
        dispatch({ type: UPDATE_PROFILE, payload: res.data });
      })
      .catch((error) => {
        dispatch({ type: DELETE_EXPERIENCE_ERROR, payload: null });
        throw error;
      });
  };
}

export function deleteEducationAction(id) {
  return (dispatch) => {
    return deleteEducation(id)
      .then((res) => {
        dispatch({ type: UPDATE_PROFILE, payload: res.data });
      })
      .catch((error) => {
        dispatch({ type: DELETE_EDUCATION_ERROR, payload: null });
        throw error;
      });
  };
}

export function deleteAccountAction() {
  return (dispatch) => {
    return deleteAccount()
      .then((res) => {
        dispatch({ type: CLEAR_PROFILE, payload: null });
        dispatch({ type: ACCOUNT_DELETED, payload: null });
        return res.data;
      })
      .catch((error) => {
        throw error;
      });
  }
}

export function fetchProfilesAction() {
  return (dispatch) => {
    dispatch({ type: FETCH_PROFILES_BEGIN, payload: null });

    return fetchProfiles()
      .then((res) => {
        dispatch({ type: FETCH_PROFILES_SUCCESS, payload: res.data });
      })
      .catch((error) => {
        dispatch({ type: FETCH_PROFILES_ERROR, payload: null });
        throw error;
      });
  }
}

export function fetchProfileAction(id) {
  return (dispatch) => {
    dispatch({ type: FETCH_SINGLE_PROFILE_BEGIN, payload: null });

    return fetchSingleProfile(id)
      .then((res) => {
        dispatch({ type: FETCH_SINGLE_PROFILE_SUCCESS, payload: res.data });
      })
      .catch((error) => {
        dispatch({ type: FETCH_SINGLE_PROFILE_ERROR, payload: null });
        throw error;
      });
  }
}
