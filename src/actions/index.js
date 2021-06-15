export const ACTION_TOKEN = 'ACTION_TOKEN';
export const ACTION_REDIRECT = 'ACTION_REDIRECT';

const actionRedirect = () => ({
  type: ACTION_REDIRECT,
});

const actionToken = (token) => ({
  type: ACTION_TOKEN,
  token,
});

export function fetchToken() {
  return (dispatch) => {
    dispatch(actionRedirect());
    return fetch(`https://opentdb.com/api_token.php?command=request
  `)
      .then((response) => response.json())
      .then((response) => dispatch(actionToken(response.token)))
      .then((token) => localStorage.setItem('token', JSON.stringify(token)));
  };
}
