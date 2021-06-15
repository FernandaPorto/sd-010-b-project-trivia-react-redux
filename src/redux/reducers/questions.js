const initialState = {
  perguntas: {},
};

function questionReducer(state = initialState, action) {
  switch (action.type) {
  case 'GET_QUESTIONS':
    return ({
      ...state,
      perguntas: action.value.perguntas,
    });
  default:
    return state;
  }
}

export default questionReducer;
