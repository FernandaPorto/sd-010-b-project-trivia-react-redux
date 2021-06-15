import { RESET_COLORS, SHOW_ANSWERS } from '../actions/index';

const INITIAL_STATE = ({
  styles: {
    rigth: '',
    wrong: '',
  },
});

const gameStyles = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SHOW_ANSWERS:
    return ({
      ...state,
      styles: {
        ...state.styles,
        rigth: action.rigth,
        wrong: action.wrong,
      },
    });
  case RESET_COLORS:
    return (INITIAL_STATE);
  default:
    return state;
  }
};

export default gameStyles;
