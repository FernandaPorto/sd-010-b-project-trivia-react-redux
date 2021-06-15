export const REQUEST_API = 'REQUEST_API';
export const RECEIVE_TOKEN = 'RECEIVE_TOKEN';

const receiveToken = (token) => ({ type: RECEIVE_TOKEN, token });

export function requestAPI() {
  return async (dispatch) => {
    const request = await fetch('https://opentdb.com/api_token.php?command=request');
    const { token } = await request.json();
    localStorage.setItem('token', token);
    dispatch(receiveToken(token));
  };
}
