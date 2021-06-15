import REQUEST_TOKEN from './index';

export const saveToken = (objToken) => ({
  type: REQUEST_TOKEN,
  payload: {
    objToken,
  },
});

export function fetchToken() {
  return (dispatch) => fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json())
    .then((success) => dispatch(saveToken(success)));
}
