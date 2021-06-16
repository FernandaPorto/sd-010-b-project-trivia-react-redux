export const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
export const TOKEN_FAILURE = 'TOKEN_FAILURE';
export const QUESTIONS_SUCCESS = 'QUESTIONS_SUCCESS';

const requestTokenSuccess = (payload) => ({
  type: TOKEN_SUCCESS,
  payload,
});

const requestTokenFailure = (payload) => ({
  type: TOKEN_FAILURE,
  payload,
});

const requestQuestions = (payload) => ({
  type: QUESTIONS_SUCCESS,
  payload,
});

export const fetchQuestions = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    dispatch(requestQuestions(data));
  } catch (error) {
    console.log(error);
  }
};

export const fetchToken = () => async (dispatch) => {
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    localStorage.setItem('token', data.token);
    dispatch(requestTokenSuccess(data));
  } catch (error) {
    dispatch(requestTokenFailure(error));
  }
};
