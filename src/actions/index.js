export const SEND_TOKEN = 'send_token';
export const SEND_EMAIL = 'send_email';
export const SEND_NOME = 'send_nome';
export const SEND_GRAVATAR = 'send_gravatar';
export const SHOW_ANSWERS = 'send_answers';
export const RESET_COLORS = 'reset_colors';
export const START_COUNT = 'start_count';
export const DECREASE_COUNT = 'decrease_count';
export const DISABLE_BUTTONS = 'disable_buttons';

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

export const changeStyles = () => ({
  type: SHOW_ANSWERS,
  rigth: '3px solid rgb(6, 240, 15)',
  wrong: '3px solid rgb(255, 0, 0)',
});

export const resetStyles = () => ({
  type: RESET_COLORS,
  rigth: 'initial',
  wrong: 'initial',
});

export const startCounting = () => ({
  type: START_COUNT,
});

export const decreaseOneSecond = () => ({
  type: DECREASE_COUNT,
});

export const disableButtons = () => ({
  type: DISABLE_BUTTONS,
});
