import {
  ANSWER_QUESTION,
  GET_QUESTIONS,
  NEXT_QUESTION,
  START_GAME,
  UPDATE_SECONDS,
} from '../actions';

const INITIAL_STATE = {
  isLoading: false,
  isResolved: false,
  questionIndex: 0,
  questions: [],
  secondsLeft: 30,
};

function gameReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case ANSWER_QUESTION:
    return {
      ...state,
      isResolved: true,
    };
  case GET_QUESTIONS:
    return {
      ...state,
      isLoading: false,
      questions: payload.questions,
    };
  case NEXT_QUESTION:
    return {
      ...state,
      isResolved: false,
      questionIndex: payload.nextIndex,
      secondsLeft: 30,
    };
  case START_GAME:
    return {
      ...state,
      isLoading: true,
    };
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
