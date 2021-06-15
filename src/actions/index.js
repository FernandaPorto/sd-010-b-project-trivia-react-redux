export const ENVIA_DADOS_USUARIO = 'ENVIA_DADOS_USUARIO';
export const GET_API_RESULT = 'GET_API_RESULT';

export const enviaDadosUsuario = (payload) => ({
  type: ENVIA_DADOS_USUARIO,
  payload,
});

export const getApiResultAction = (payload) => ({
  type: GET_API_RESULT,
  payload,
});
