export const REQUEST_API = 'REQUEST_API';
export const GET_TOKEN = 'GET_TOKEN';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const LOGIN_PLAYER = 'LOGIN_PLAYER';
export const SCORE_PLAYER = 'SCORE_PLAYER';
export const ASSERTIONS_PLAYER = 'ASSERTIONS_PLAYER';

export function requestApi() {
  return {
    type: REQUEST_API,
  };
}

export function receiveToken(token) {
  return {
    type: GET_TOKEN,
    token,
  };
}

export function receiveQuestions(questions) {
  return {
    type: GET_QUESTIONS,
    questions,
  };
}

export function loginPlayer({ name, email }) {
  return {
    type: LOGIN_PLAYER,
    name,
    email,
  };
}

export function scorePlayer(score) {
  return {
    type: SCORE_PLAYER,
    score,
  };
}

export function assertionsPlayer(assertions) {
  return {
    type: ASSERTIONS_PLAYER,
    assertions,
  };
}
