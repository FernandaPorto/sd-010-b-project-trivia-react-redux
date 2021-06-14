export const REQUEST_API = 'REQUEST_API';

export const requestAPI = (result) => ({ type: REQUEST_API, result });

export function fetchAPI() {
  return async (dispatch) => {
    const result = await fetch('https://opentdb.com/api_token.php?command=request');
    const resultJson = await result.json();
    return dispatch(requestAPI(resultJson));
  };
}
