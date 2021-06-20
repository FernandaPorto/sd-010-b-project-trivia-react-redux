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
      player: {
        name: '',
        assertions: 0,
        score: 0,
        gravatarEmail: '',
      },
      ranking: [
        { name: '',
          score: 0,
          picture: '',
        },
      ],
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

export function eachScoreAction(eachScore) {
  return ({
    type: EACH_SCORE,
    payload: eachScore,
  });
}

export function assertionsAction(rightAnswer) {
  return ({
    type: ASSERTIONS,
    payload: rightAnswer,
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
