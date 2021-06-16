export const SET_TOKEN = 'SET_TOKEN';
export const INPUT_USERNAME = 'INPUT_USERNAME';
export const INPUT_EMAIL = 'INPUT_EMAIL';
export const SUCCESS_TRIVIA = 'SUCCESS_TRIVIA';
export const ERR_TRIVIA = 'ERR_TRIVIA';
export const LOADING = 'LOADING';
export const UPDATE_SCORE = 'UPDATE_SCORE';

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

export const getScore = (score) => ({
  type: UPDATE_SCORE,
  score,
});

export const getTrivia = (token) => {
  const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
  return (dispatch) => {
    fetch(URL)
      .then((res) => res.json())
      .then(({ results }) => (
        dispatch({ type: SUCCESS_TRIVIA, results, isFetching: false })
      ))
      .catch((err) => dispatch({ type: ERR_TRIVIA, err, isFetching: false }));
  };
};
