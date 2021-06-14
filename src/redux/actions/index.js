export const LOGIN = 'LOGIN';

export function actionLogin(dataAction) {
  return {
    type: LOGIN,
    payload: dataAction,
  };
}
