export const SAVE_USER_EMAIL = 'SAVE_USER_EMAIL';
export const SO_P_PARAR_D_RECLAMAR = '';

export const saveUserEmail = (email) => ({
  type: SAVE_USER_EMAIL,
  payload: {
    email,
  },
});
