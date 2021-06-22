import { RESET_DATA, UPDATE_NAME, UPDATE_ASSERTIONS,
  UPDATE_GRAVATAR_EMAIL, UPDATE_SCORE, UPDATE_URL_GRAVATAR } from '.';

export const updateName = (name) => ({
  type: UPDATE_NAME,
  name,
});

export const updateScore = (score) => ({
  type: UPDATE_SCORE,
  score,
});

export const updateAssertions = () => ({
  type: UPDATE_ASSERTIONS,
});

export const updateGravatarEmail = (gravatarEmail) => ({
  type: UPDATE_GRAVATAR_EMAIL,
  gravatarEmail,
});

export const updateUrlGravatar = (urlGravatar) => ({
  type: UPDATE_URL_GRAVATAR,
  urlGravatar,
});

export const resetData = () => ({
  type: RESET_DATA,
});
