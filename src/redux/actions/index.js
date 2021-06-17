export const LOGIN = 'LOGIN';
export const UPDATE_SECONDS = 'UPDATE_SECONDS';

export const loginActionCreator = (payload) => ({
  type: LOGIN,
  payload,
});

export const updateSecondsActionCreator = (payload) => ({
  type: UPDATE_SECONDS,
  payload,
});
