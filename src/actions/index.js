export const ACTION_TOKEN = 'ACTION_TOKEN';

const actionToken = (token) => ({
  type: ACTION_TOKEN,
  token,
});

export function fetchToken() {
  return (dispatch) => fetch(`https://opentdb.com/api_token.php?command=request
  `)
    .then((response) => response.json())
    .then((response) => dispatch(actionToken(response)));
}
