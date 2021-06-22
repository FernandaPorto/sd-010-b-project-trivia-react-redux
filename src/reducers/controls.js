import { BUTTON_READY, ENABLE_CONTROL, QUESTION_INDEX,
  REDIRECT, RESTART_TIMER, UPDATE_STYLE, UPDATE_TIMER } from '../actions';

const TIME_TO_ANSWER = 30;
const NUMBER_OF_QUESTIONS = 5;

const INITIAL_STATE = {
  buttonReady: false,
  disable: false,
  redirect: false,
  questionIndex: 0,
  numberOfQuestions: NUMBER_OF_QUESTIONS,
  timer: TIME_TO_ANSWER,
  rightStyle: '',
  wrongStyle: '',
};

export default function controls(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case ENABLE_CONTROL:
    return {
      ...state,
      disable: payload,
    };
  case BUTTON_READY:
    return {
      ...state,
      buttonReady: payload,
    };
  case UPDATE_TIMER:
    return {
      ...state,
      timer: state.timer - 1,
    };
  case RESTART_TIMER:
    return {
      ...state,
      timer: TIME_TO_ANSWER,
    };
  case QUESTION_INDEX:
    return {
      ...state,
      questionIndex: payload,
    };
  case REDIRECT:
    return {
      ...state,
      redirect: payload,
    };
  case UPDATE_STYLE:
    return {
      ...state,
      rightStyle: payload.rightStyle,
      wrongStyle: payload.wrongStyle,
    };
  default:
    return state;
  }
}
