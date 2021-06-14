export const SET_TOKEN = 'SET_TOKEN';
export const INPUT_USERNAME = 'INPUT_USERNAME';
export const INPUT_EMAIL = 'INPUT_EMAIL';

export const addToken = (token) => ({
  type: SET_TOKEN,
  token,
});

export const inputUsername = (username) => ({
  type: INPUT_USERNAME,
  payload: {
    username,
  },
});

export const inputEmail = (email) => ({
  type: INPUT_EMAIL,
  payload: {
    email,
  },
});
