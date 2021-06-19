import { SAVE_NUM_QUESTION, SAVE_CORRECT_ANSWER } from '../actions';

const INITIAL_STATE = {
  numQuestion: 0,
  correctAnswer: 0,
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_NUM_QUESTION:
    return {
      ...state,
      numQuestion: action.payload.numQuestion,
    };
  case SAVE_CORRECT_ANSWER:
    return {
      ...state,
      correctAnswer: action.payload.correctAnswer,
    };
  default:
    return state;
  }
};

export default game;
