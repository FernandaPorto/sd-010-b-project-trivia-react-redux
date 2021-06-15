export const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
export const TOKEN_FAILURE = 'TOKEN_FAILURE';

export const requestTokenSuccess = (payload) => ({
  type: TOKEN_SUCCESS,
  payload,
});
export const requestTokenFailure = (payload) => ({
  type: TOKEN_FAILURE,
  payload,
});
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
