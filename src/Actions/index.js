import { getFullAPI, getTrivaQuestions } from '../Services/API';

export const GET_API = 'GET_API';
export const ERROR = 'ERROR';

export const getToken = (param) => ({
  type: GET_API,
  payload: param,
});

const errorApi = (error) => ({
  type: ERROR,
  payload: error,
});

export const savetoken = (token) => (
  { type: 'TOKEN',
    payload: token });

export const requestToken = () => async (dispatch) => getFullAPI()
  .then((response) => {
    // savetoken(response.token);
    localStorage.setItem('token', response.token);
    return getTrivaQuestions(response.token);
  })
  .then((response) => dispatch(getToken(response.results)))
  .catch((error) => dispatch(errorApi(error)));

export const userAction = (name, email, hash, rank) => ({
  type: 'USER',
  payload: {
    name,
    email,
    hash,
    rank,
  },
}
);

export const pointsAction = (points) => ({
  type: 'POINTS',
  payload: {
    points,
  },
}
);

export const correctAction = (correct) => ({
  type: 'CORRECT',
  payload: {
    correct,
  },
});
