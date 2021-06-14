import { fetchToken } from '../services/API';

export const GET_TOKEN = 'GET_TOKEN';
export const GET_GRAVATAR = 'GET_GRAVATAR';

export const getToken = (payload) => ({
  type: GET_TOKEN,
  payload,
});

export const getGravatar = (payload) => ({
  type: GET_GRAVATAR,
  payload,

});

export const getTokenAPI = () => async (dispatch) => {
  const response = await fetchToken();
  return dispatch(getToken(response));
};
