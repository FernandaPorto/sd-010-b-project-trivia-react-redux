export const LOGIN = 'LOGIN';
export const TOGGLE_TIMER = 'TOGGLE_TIMER';
export const TIME_LEFT = 'TIME_LEFT';

export const loginActionCreator = (payload) => ({
  type: LOGIN,
  payload,
});

export const toggleTimerActionCreator = () => ({
  type: TOGGLE_TIMER,
});

export const timeLeftActionCreator = (payload) => ({
  type: TIME_LEFT,
  payload,
});
