export const LOGIN = 'LOGIN';

export function login(dataAction) {
  return {
    type: LOGIN,
    payload: dataAction,
  };
}
