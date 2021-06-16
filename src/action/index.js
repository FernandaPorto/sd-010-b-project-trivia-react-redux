import { fetchToken, fetchQuestions } from '../services/API';

export const GET_TOKEN = 'GET_TOKEN';
export const GET_GRAVATAR = 'GET_GRAVATAR';
export const GET_PLAYER_INFO = 'GET_PLAYER_INFO';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const UPDATE_TIME = 'UPDATE_TIME';
export const UPDATE_SCORE = 'UPDATE_SCORE';

const NUM_OF_QUESTIONS = 5;

export const getToken = (payload) => ({
  type: GET_TOKEN,
  payload,
});

export const getPLayerInfo = (payload) => ({
  type: GET_PLAYER_INFO,
  payload,
});

export const getQuetions = (payload) => ({
  type: GET_QUESTIONS,
  payload,
});

export const updateTime = (payload) => ({
  type: UPDATE_TIME,
  payload,
});

export const updateScore = (payload) => ({
  type: UPDATE_SCORE,
  payload,
});

export const getTokenAPI = () => async (dispatch) => {
  const response = await fetchToken();
  localStorage.setItem('token', response.token);
  dispatch(getToken(response));

  const questions = await fetchQuestions(NUM_OF_QUESTIONS, response.token);
  dispatch(getQuetions(questions));

  const playerData = {
    player: {
      score: 0,
      assertions: [],
    },
  };
  localStorage.setItem('state', JSON.stringify(playerData));
};
