import { fetchQuestions } from '../../services/api';

export const LOGIN = 'LOGIN';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';
export const NEXT_QUESTION = 'NEXT_QUESTION';
export const UPDATE_SECONDS = 'UPDATE_SECONDS';

export const loginActionCreator = (payload) => ({
  type: LOGIN,
  payload,
});

export const updateScoreActionCreator = (payload) => ({
  type: UPDATE_SCORE,
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
    const { results } = await fetchQuestions(token);
    // console.log(results);
    const PROBABILITY_BASE = 0.5;
    const randomizer = (array) => array.sort(() => Math.random() - PROBABILITY_BASE);
    const questions = results.map((result) => ({
      type: result.type,
      category: result.category,
      difficulty: result.difficulty,
      question: result.question,
      answerOptions: randomizer([...result.incorrect_answers, result.correct_answer]),
      correctAnswer: result.correct_answer,
    }));

    dispatch(getQuestionsActionCreator({ questions }));
  } catch (error) {
    console.log(error);
  }
};
