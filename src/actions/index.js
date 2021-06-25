const md5 = require('crypto-js/md5');

const GET_GRAVATAR = 'GET_GRAVATAR';
const GET_QUESTIONS = 'GET_QUESTIONS';

export const getGravatarAction = (name, email) => {
  console.log(email);
  return ({
    type: GET_GRAVATAR,
    payload: {
      name,
      gravatarEmail: email,
    },
  });
};

const getQuestions = (questions) => {
  console.log('getQuestions');
  console.log(questions);
  return {
    type: GET_QUESTIONS,
    payload: {
      questions,
    },
  };
};

function storeTokenInLocalStorage() {
  fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json())
    .then((tokenAPI) => {
      if (localStorage){
        localStorage.setItem('token', JSON.stringify(tokenAPI.token))
      }
    });
}

function getTokenFromLocalStorage() {
   return JSON.parse(localStorage.getItem('token'));
}

export function fetchQuestionsAction() {
  return (dispatch) => {
    // dispatch(requestDog());
    return fetch(`https://opentdb.com/api.php?amount=5&token=${getTokenFromLocalStorage()}`)
      .then((r) => r.json())
      .then((json) => {
        const TOKEN_INVALID_CODE = 3;
        if (json.response_code === TOKEN_INVALID_CODE) {
          storeTokenInLocalStorage();
        } else {
          fetch(`https://opentdb.com/api.php?amount=5&token=${getTokenFromLocalStorage()}`)
            .then((r) => r.json())
            .then((jsonS) => dispatch(getQuestions(jsonS.results)));
        }
      });
  };
}

/* export function fetchQuestions() {
  console.log('dentro da função fetchQuestions');
  return (dispatch) => {
    return fetch(`https://opentdb.com/api.php?amount=5&token=1101fb9986fba7d90fcd8e60517d8edda88feb79e23421310c3109c125febfdd`)
      .then((response) => response.json())
      .then((questions) => (dispatch(getQuestions(questions.results))))
      .catch((error) => console.log(error));
  };
} */

//  `https://www.gravatar.com/avatar/${md5(email).toString()}