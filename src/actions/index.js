export const LOGIN = 'login';
export const GRAVATAR = 'gravatar';
export const SCORE = 'score';
export const EACH_SCORE = 'each_score';
export const ASSERTIONS = 'assertions';

export function loginAction({ name, email }) {
  return ({
    type: LOGIN,
    payload: {
      name,
      email,
    },
  });
}

export function gravatarAction(gravatar) {
  return ({
    type: GRAVATAR,
    gravatar,
  });
}

export function scoreAction(score) {
  return ({
    type: SCORE,
    payload: score,
  });
}

export function eachScoreAction(score) {
  return ({
    type: EACH_SCORE,
    payload: score,
  });
}

export function assertionsAction(rightAnswers) {
  return ({
    type: ASSERTIONS,
    payload: rightAnswers,
  });
}

// export function currencyNow(currency) {
//     return async (dispatch) => {
//       const resultAPI = await getAPICurrency();
//       delete resultAPI.USDT;
//       currency.exchangeRates = resultAPI;
//       dispatch({
//         type: CURRENCYNOW,
//         payload: currency,
//       });
//     };
//   }
