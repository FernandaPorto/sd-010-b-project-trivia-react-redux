export const LOGIN = 'login';
export const GRAVATAR = 'gravatar';

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
