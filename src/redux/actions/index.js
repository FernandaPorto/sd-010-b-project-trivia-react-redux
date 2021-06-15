export const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
export const TOKEN_FAILURE = 'TOKEN_FAILURE';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';

const requestTokenSuccess = (payload) => ({
  type: TOKEN_SUCCESS,
  payload,
});
const requestTokenFailure = (payload) => ({
  type: TOKEN_FAILURE,
  payload,
});

const requestQuestions = (payload) => ({
  type: REQUEST_SUCCESS,
  payload,
});

const numberQuestion = 5;

export const fetchQuestions = (token, amount = numberQuestion) => async (dispatch) => {
  try {
    const response = await fetch(`https://opentdb.com/api.php?amount=${amount}&token=${token}`);
    const data = await response.json();
    console.log(data);
    dispatch(requestQuestions(data));
  } catch (error) {
    dispatch(requestTokenFailure(error));
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
