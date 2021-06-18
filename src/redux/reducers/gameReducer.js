import {
  START_GAME,
  GET_QUESTIONS,
  ANSWER_QUESTION,
  NEXT_QUESTION,
  UPDATE_SECONDS,
} from '../actions';

const INITIAL_STATE = {
  isLoading: false,
  questions: [],
  questionIndex: 0,
  isResolved: false,
  secondsLeft: 30,
};

function gameReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case START_GAME:
    return {
      ...state,
      isLoading: true,
    };
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
  case NEXT_QUESTION: {
    let questionIndex = state.questionIndex + 1;
    if (state.questionIndex === state.questions.length - 1) {
      questionIndex = 0;
    }
    return {
      ...state,
      questionIndex,
      isResolved: false,
      secondsLeft: 30,
    };
  }
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
