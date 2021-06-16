export const ENVIA_DADOS_USUARIO = 'ENVIA_DADOS_USUARIO';
export const GET_API_RESULT = 'GET_API_RESULT';
export const UPDATE_PLAYER_POINTS = 'UPDATE_PLAYER_POINTS';
export const CLEAR_ALL_DATA_STORE = 'CLEAR_ALL_DATA_STORE';
export const ADD_PLAYER_TO_RANKING = 'ADD_PLAYER_TO_RANKING';

export const enviaDadosUsuario = (payload) => ({
  type: ENVIA_DADOS_USUARIO,
  payload,
});

export const getApiResultAction = (payload) => ({
  type: GET_API_RESULT,
  payload,
});

export const updatePlayerPoints = (payload) => ({
  type: UPDATE_PLAYER_POINTS,
  payload,
});

export const clearAllDataStore = () => ({
  type: CLEAR_ALL_DATA_STORE,
});

export const addPlayerToRanking = (payload) => ({
  type: ADD_PLAYER_TO_RANKING,
  payload,
});
