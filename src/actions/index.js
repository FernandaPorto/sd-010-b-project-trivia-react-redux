export const SAVE_USER_INFO = 'SAVE_USER_INFO';
export const SAVE_NUM_QUESTION = 'SAVE_NUM_QUESTION';
export const SAVE_CORRECT_ANSWER = 'SAVE_CORRECT_ANSWER';

export const saveUserInfo = (email, name) => ({
  type: SAVE_USER_INFO,
  payload: {
    email,
    name,
  },
});

export const saveNumQuestion = (numQuestion) => ({
  type: SAVE_NUM_QUESTION,
  payload: {
    numQuestion,
  },
});

export const saveCorrectAnswer = (correctAnswer) => ({
  type: SAVE_CORRECT_ANSWER,
  payload: {
    correctAnswer,
  },
});
