import {
  ACTION_TOKEN,
  ACTION_REDIRECT,
  ACTION_QUESTIONS,
  ACTION_URL,
} from '../actions/index';

const INITIALSTATE = {
  token: '',
  isRedirect: false,
  questions: false,
  url: '',
  name: '',
  score: 0,
};

function triviaGame(state = INITIALSTATE, action) {
  switch (action.type) {
  case ACTION_REDIRECT:
    return {
      ...state,
      isRedirect: true,
    };
  case ACTION_TOKEN:
    return {
      ...state,
      token: action.token,
    };
  case ACTION_QUESTIONS:
    return {
      ...state,
      questions: action.questions,
    };
  case ACTION_URL:
    return {
      ...state,
      url: action.payload.url,
      name: action.payload.name,
    };
  default:
    return state;
  }
}

export default triviaGame;
