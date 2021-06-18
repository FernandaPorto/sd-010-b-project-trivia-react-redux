export const ADD_EMAIL = 'ADD_EMAIL';
export const IS_LOADING = 'IS_LOADING';
export const GET_TOKEN = 'GET_TOKEN';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const IS_LOADING_TRIVIA = 'IS_LOADING_TRIVIA';

export const addEmail = (email) => ({ type: ADD_EMAIL, email });
export const isLoading = () => ({ type: IS_LOADING, isLoading: true });
export const getToken = (token) => ({ type: GET_TOKEN, token, isLoading: false });

export const isLoadingTrivia = () => ({ type: IS_LOADING_TRIVIA, isLoadingTrivia: true });
export const getQuestions = (results) => (
  { type: GET_QUESTIONS, results, isLoadingTrivia: false }
);

// export const getTriviaApi = () => (dispatch) => {
//   dispatch(ifFetchTrivia());
//   const token = JSON.parse(localStorage.getItem('token'));
//   fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
//     .then((response) => response.json())
//     .then((results) => dispatch(getQuestions(results)));
// };

export const getTokenApi = () => (dispatch) => {
  dispatch(isLoading());
  fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json())
    .then((token) => {
      dispatch(getToken(token));
      localStorage.setItem('token', JSON.stringify(token.token));
    })
    .then(() => {
      dispatch(isLoadingTrivia());
      const token = JSON.parse(localStorage.getItem('token'));
      fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
        .then((response) => response.json())
        .then((results) => dispatch(getQuestions(results)));
    });
};
