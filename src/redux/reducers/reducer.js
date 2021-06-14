import initialState from './initialState';

const reducer = (state = initialState, action) => {
  console.log(action);
  return state;
};

export default reducer;
