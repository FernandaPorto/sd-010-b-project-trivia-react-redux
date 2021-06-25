import { decode } from 'he';

import {
  fetchCategories,
  fetchCategoryQuestionCount,
  fetchQuestions,
} from '../../services/api';

const BASE_POINTS = 10;
const PROBABILITY_BASE = 0.5;

export const ANSWER_QUESTION = 'ANSWER_QUESTION';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const NEXT_QUESTION = 'NEXT_QUESTION';
export const SAVE_SETTINGS = 'SAVE_SETTINGS';
export const START_GAME = 'START_GAME';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const UPDATE_SECONDS = 'UPDATE_SECONDS';

const randomizer = (array) => array.sort(() => Math.random() - PROBABILITY_BASE);

export const answerQuestionActionCreator = () => ({
  type: ANSWER_QUESTION,
});

export const getCategoriesActionCreator = (payload) => ({
  type: GET_CATEGORIES,
  payload,
});

export const getQuestionsActionCreator = (payload) => ({
  type: GET_QUESTIONS,
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

export const startGameActionCreator = (payload) => ({
  type: START_GAME,
  payload,
});

export const updateScoreActionCreator = (payload) => ({
  type: UPDATE_SCORE,
  payload,
});

export const updateSecondsActionCreator = (payload) => ({
  type: UPDATE_SECONDS,
  payload,
});

export const getCategoriesThunk = () => async (dispatch) => {
  try {
    const categories = await fetchCategories();

    categories.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    const promises = categories.map(({ id }) => fetchCategoryQuestionCount(id));
    const questionCount = await Promise.all(promises);

    categories.forEach((category, index) => {
      category.questionCount = {
        total: questionCount[index].category_question_count.total_question_count,
        easy: questionCount[index].category_question_count.total_easy_question_count,
        medium: questionCount[index].category_question_count.total_medium_question_count,
        hard: questionCount[index].category_question_count.total_hard_question_count,
      };
    });

    dispatch(getCategoriesActionCreator({ categories }));
  } catch (error) {
    console.log(error);
  }
};

export const getQuestionsThunk = ({ settings }) => async (dispatch) => {
  try {
    const token = JSON.parse(localStorage.getItem('token'));
    const { results } = await fetchQuestions(token.value, settings);

    const questions = results.map((result) => {
      const question = decode(result.question);
      const correctAnswer = decode(result.correct_answer);
      const incorrectAnswers = result.incorrect_answers.map((answer) => decode(answer));
      const answerOptions = randomizer([correctAnswer, ...incorrectAnswers]);

      return {
        category: result.category,
        difficulty: result.difficulty,
        type: result.type,
        question,
        answerOptions,
        correctAnswer,
      };
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
