export const SAVE_USER_INFO = 'SAVE_USER_INFO';
export const SO_P_PARAR_D_RECLAMAR = '';

export const saveUserInfo = (email, name) => ({
  type: SAVE_USER_INFO,
  payload: {
    email,
    name,
  },
});
