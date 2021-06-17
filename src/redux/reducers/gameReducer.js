import {
  GET_QUESTIONS,
  ANSWER_QUESTION,
  NEXT_QUESTION,
  UPDATE_SECONDS,
} from '../actions';

const INITIAL_STATE = {
  isLoading: true,
  questions: [],
  questionIndex: 0,
  isResolved: false,
  secondsLeft: 30,
};

function gameReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case GET_QUESTIONS:
    return {
      ...state,
      isLoading: false,
      questions: payload.questions,
    };
  case ANSWER_QUESTION:
    return {
      ...state,
      isResolved: true,
    };
  case NEXT_QUESTION:
    if (state.questionIndex < state.questions.length - 1) {
      return {
        ...state,
        questionIndex: state.questionIndex + 1,
        isResolved: false,
        secondsLeft: 30,
      };
    }
    return state;
  case UPDATE_SECONDS:
    return {
      ...state,
      secondsLeft: payload.secondsLeft,
    };
  default:
    return state;
  }
}

export default gameReducer;
