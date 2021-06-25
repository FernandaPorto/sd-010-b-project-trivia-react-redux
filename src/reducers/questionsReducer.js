const INITIAL_STATE = [];
const GET_QUESTIONS = 'GET_QUESTIONS';

const questionsReducer = (state = INITIAL_STATE, action) => {
  console.log('Dentro das questions reducer');
  switch (action.type) {
  case GET_QUESTIONS:
    return {
      ...action.payload.questions.sort(),
    };
  default:
    return state;
  }
};

export default questionsReducer;
