export const playerLogin = (nameAndImgPath) => ({
  type: 'PLAYER_LOGIN',
  payload: nameAndImgPath,
});

export const playerScore = (stats) => ({
  type: 'PLAYER_SCORE',
  payload: stats,
});

export const addToRanking = (userInfo) => ({
  type: 'ADD_TO_RANKING',
  payload: userInfo,
});

export const addToken = (token) => ({
  type: 'ADD_TOKEN',
  payload: token,
});

export const playAgain = () => ({
  type: 'PLAY_RESET',
});
