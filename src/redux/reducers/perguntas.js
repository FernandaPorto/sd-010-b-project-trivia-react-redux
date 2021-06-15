const initialState = {
  perguntas: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
  case 'REQUEST_PERGUNTAS':
    return {
      perguntas: action.payload,
    };

  default:
    return state;
  }
};
