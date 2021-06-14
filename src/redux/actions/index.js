export const ADD_TOKEN = 'GET_TOKEN';
export const ADD_IMG_URL = 'ADD_IMG_URL';

export const getToken = (token) => ({
  type: ADD_TOKEN,
  token,
});

export function fetchToken() {
  return async (dispatch) => {
    try {
      const response = await fetch('https://opentdb.com/api_token.php?command=request');
      const data = await response.json();
      dispatch(getToken(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export const addImage = (img) => ({
  type: ADD_IMG_URL,
  picture: img,
});
