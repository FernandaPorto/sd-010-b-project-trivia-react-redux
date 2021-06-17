import { requestTokenAPI } from '../service/API_REQUESTS';

export const playerLogin = (nameAndImgPath) => ({
  type: 'PLAYER_LOGIN',
  payload: nameAndImgPath,
});

export const addToken = (token) => ({
  type: 'ADD_TOKEN',
  payload: token,
});

export const addToRanking = (userInfo) => ({
  type: 'ADD_TO_RANKING',
  payload: userInfo,
});

export const requestToken = () => async (dispatch) => {
  const token = await requestTokenAPI();
  localStorage.setItem('token', token);
  dispatch(addToken(token));
};
