import { fetchQuestions } from '../../services/api';

export const LOGIN = 'LOGIN';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';
export const NEXT_QUESTION = 'NEXT_QUESTION';
export const UPDATE_SECONDS = 'UPDATE_SECONDS';

export const loginActionCreator = (payload) => ({
  type: LOGIN,
  payload,
});

export const getQuestionsActionCreator = (payload) => ({
  type: GET_QUESTIONS,
  payload,
});

export const answerQuestionActionCreator = (payload) => ({
  type: ANSWER_QUESTION,
  payload,
});

export const nextQuestionActionCreator = (payload) => ({
  type: NEXT_QUESTION,
  payload,
});

export const updateSecondsActionCreator = (payload) => ({
  type: UPDATE_SECONDS,
  payload,
});

export const getQuestionsThunk = () => async (dispatch) => {
  const { token } = localStorage;
  try {
    const { results: questions } = await fetchQuestions(token);
    dispatch(getQuestionsActionCreator({ questions }));
  } catch (error) {
    console.log(error);
  }
};
