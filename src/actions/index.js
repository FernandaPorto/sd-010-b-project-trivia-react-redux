export const SEND_TOKEN = 'send_token';
export const SEND_EMAIL = 'send_email';
export const SEND_NOME = 'send_nome';
export const SEND_GRAVATAR = 'send_gravatar';

export const sendTokenToRedux = (token) => ({
  type: SEND_TOKEN,
  token,
});

export const sendEmailToRedux = (email) => ({
  type: SEND_EMAIL,
  email,
});

export const sendNomeToRedux = (nome) => ({
  type: SEND_NOME,
  nome,
});

export const sendGravatarToRedux = (gravatar) => ({
  type: SEND_GRAVATAR,
  gravatar,
});
