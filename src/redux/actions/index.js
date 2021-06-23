import { decode } from 'he';

import { fetchQuestions } from '../../services/api';

const PROBABILITY_BASE = 0.5;
const BASE_POINTS = 10;
const randomizer = (array) => array.sort(() => Math.random() - PROBABILITY_BASE);

export const ANSWER_QUESTION = 'ANSWER_QUESTION';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const LOGIN = 'LOGIN';
export const NEXT_QUESTION = 'NEXT_QUESTION';
export const SAVE_SETTINGS = 'SAVE_SETTINGS';
export const START_GAME = 'START_GAME';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const UPDATE_SECONDS = 'UPDATE_SECONDS';

export const answerQuestionActionCreator = () => ({
  type: ANSWER_QUESTION,
});

export const getQuestionsActionCreator = (payload) => ({
  type: GET_QUESTIONS,
  payload,
});

export const loginActionCreator = (payload) => ({
  type: LOGIN,
  payload,
});

export const nextQuestionActionCreator = (payload) => ({
  type: NEXT_QUESTION,
  payload,
});

export const saveSettingsActionCreator = (payload) => ({
  type: SAVE_SETTINGS,
  payload,
});

export const startGameActionCreator = () => ({
  type: START_GAME,
});

export const updateScoreActionCreator = (payload) => ({
  type: UPDATE_SCORE,
  payload,
});

export const updateSecondsActionCreator = (payload) => ({
  type: UPDATE_SECONDS,
  payload,
});

export const getQuestionsThunk = ({ settings }) => async (dispatch) => {
  try {
    const { token } = localStorage;
    const { results } = await fetchQuestions(token, settings);
    // console.log(results);
    const questions = results.map((result) => {
      const question = decode(result.question);
      const correctAnswer = decode(result.correct_answer);
      const incorrectAnswers = result.incorrect_answers.map((answer) => decode(answer));
      const answerOptions = randomizer([correctAnswer, ...incorrectAnswers]);

      return ({
        category: result.category,
        difficulty: result.difficulty,
        type: result.type,
        question,
        answerOptions,
        correctAnswer,
      });
    });
    dispatch(getQuestionsActionCreator({ questions }));
  } catch (error) {
    console.log(error);
  }
};

export const updateScoreThunk = ({ secondsLeft, difficulty }) => (dispatch) => {
  const difficultyPoints = {
    easy: 1,
    medium: 2,
    hard: 3,
  };
  const level = difficultyPoints[difficulty];
  const newScore = BASE_POINTS + secondsLeft * level;
  dispatch(updateScoreActionCreator({ newScore }));
};
