import { setToken } from '../services/API';

export const LOGIN = 'login';
export const GRAVATAR = 'gravatar';
export const SCORE = 'score';
export const EACH_SCORE = 'each_score';
export const ASSERTIONS = 'assertions';
export const FETCH = 'fetch';

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

export function fetchAction() {
  return async (dispatch) => {
    const resultOfFetch = await setToken();
    const categories = resultOfFetch.results

      .map((result) => result);
    dispatch({
      type: FETCH,
      payload: [categories],

    });
  };
}
// export function fetchAction({ resultsOfFetch }) {
//   return ({
//     type: FETCH,
//     payload: resultsOfFetch,
//   });
// }
