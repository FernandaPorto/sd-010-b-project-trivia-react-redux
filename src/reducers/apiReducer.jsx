const INITIAL_STATE = {
  token: '',
  questions: []
}

function apiReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case GET_TOKEN:
      return {
        ...state,
        token: action.token,
      }
      case GET_QUESTIONS:
      return {
        ...state,
        questions: action.questions,
      };
      default:
        return state;
  }
}
