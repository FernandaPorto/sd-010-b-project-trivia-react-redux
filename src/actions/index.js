export const REQUEST_API = 'REQUEST_API';
export const SAVE_NAME = 'SAVE_NAME';

export const requestAPI = (result) => ({ type: REQUEST_API, result });
export const saveName = (name) => ({ type: SAVE_NAME, name });

export function fetchAPI() {
  return async (dispatch) => {
    const result = await fetch('https://opentdb.com/api_token.php?command=request');
    const resultJson = await result.json();
    return dispatch(requestAPI(resultJson));
  };
}
