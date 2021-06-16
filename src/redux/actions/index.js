export const [LOGIN, SCORE, ASSERTIONS] = ['LOGIN', 'SCORE', 'ASSERTIONS'];

export function actionLogin(dataAction) {
  return {
    type: LOGIN,
    payload: dataAction,
  };
}

export function actionScore(data) {
  return {
    type: SCORE,
    payload: data,
  };
}

export function actionAssertions(data) {
  return {
    type: ASSERTIONS,
    payload: data,
  };
}
