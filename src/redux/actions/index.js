import { decode } from 'he';

import { fetchQuestions } from '../../services/api';

const PROBABILITY_BASE = 0.5;
const BASE_POINTS = 10;
const randomizer = (array) => array.sort(() => Math.random() - PROBABILITY_BASE);

export const ANSWER_QUESTION = 'ANSWER_QUESTION';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const LOGIN = 'LOGIN';
export const NEXT_QUESTION = 'NEXT_QUESTION';
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

export const getQuestionsThunk = () => async (dispatch) => {
  try {
    const { token } = localStorage;
    const { results } = await fetchQuestions(token);
    // console.log(results);
    const questions = results.map((result) => {
      result.question = decode(result.question);
      result.correct_answer = decode(result.correct_answer);
      result.incorrect_answers.forEach((answer, index) => {
        result.incorrect_answers[index] = decode(answer);
      });

      return ({
        category: result.category,
        difficulty: result.difficulty,
        type: result.type,
        question: result.question,
        answerOptions: randomizer([...result.incorrect_answers, result.correct_answer]),
        correctAnswer: result.correct_answer,
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
