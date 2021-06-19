export const SAVE_USER_INFO = 'SAVE_USER_INFO';
export const SAVE_NUM_QUESTION = 'SAVE_NUM_QUESTION';

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
