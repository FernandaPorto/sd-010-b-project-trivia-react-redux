export const ADD_EMAIL = 'ADD_EMAIL';
export const IS_FETCH = 'IS_FETCH';
export const GET_TOKEN = 'GET_TOKEN';

export const addEmail = (email) => ({ type: ADD_EMAIL, email });
export const isFetch = () => ({ type: IS_FETCH });
export const getToken = (token) => ({ type: GET_TOKEN, token });

export const getTokenApi = () => (dispatch) => {
  dispatch(isFetch());
  fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json())
    .then((token) => {
      dispatch(getToken(token));
      localStorage.setItem('token', JSON.stringify(token.token));
    });
};
