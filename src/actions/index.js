export const playerLogin = (nameAndImgPath) => ({
  type: 'PLAYER_LOGIN',
  payload: nameAndImgPath,
});

export const addToRanking = (userInfo) => ({
  type: 'ADD_TO_RANKING',
  payload: userInfo,
});

export const addToken = (token) => ({
  type: 'ADD_TOKEN',
  payload: token,
});

export const sumScore = (score) => ({
  type: 'SUM_SCORE',
  payload: score,
});

export const resetScore = () => ({
  type: 'RESET_SCORE',
});
