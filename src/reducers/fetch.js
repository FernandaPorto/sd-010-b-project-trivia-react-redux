const INITIAL_STATE = {
  params: {
    difficulty: 0,
    type: 0,
    category: 0,
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'FETCH':
    return {
      ...state,
      params: action.state,
    };
  default:
    return state;
  }
};
