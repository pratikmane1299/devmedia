import { v4 as uuid } from 'uuid';

export const SET_ALERT = 'SET_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';

export const setAlert = (message, type = 'primary') => (dispatch) => {
  const id = uuid();
  dispatch({ type: SET_ALERT, payload: { message, type, id } });

  setTimeout(() => {
    dispatch({ type: REMOVE_ALERT, payload: id });
  }, 3000);
}
