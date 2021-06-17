export const playerLogin = (nameAndImgPath) => ({
  type: 'PLAYER_LOGIN',
  payload: nameAndImgPath,
});

export const addToRanking = (userInfo) => ({
  type: 'ADD_TO_RANKING',
  payload: userInfo,
});
