export const SEND_TOKEN = 'send_token';

export const sendTokenToRedux = (token) => ({
  type: SEND_TOKEN,
  token,
});
