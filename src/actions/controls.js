import { BUTTON_READY, ENABLE_CONTROL, QUESTION_INDEX,
  REDIRECT, RESTART_TIMER, UPDATE_STYLE, UPDATE_TIMER } from '.';

export const enableDisable = (value) => ({
  type: ENABLE_CONTROL,
  payload: value,
});

export const updateTimer = (value) => ({
  type: UPDATE_TIMER,
  payload: value,
});

export const timerRestart = () => ({
  type: RESTART_TIMER,
});

export const setBtnReady = (value) => ({
  type: BUTTON_READY,
  payload: value,
});

export const setQuestionIndex = (value) => ({
  type: QUESTION_INDEX,
  payload: value,
});

export const setRedirect = (value) => ({
  type: REDIRECT,
  payload: value,
});

export const setStyle = (value) => ({
  type: UPDATE_STYLE,
  payload: value,
});
