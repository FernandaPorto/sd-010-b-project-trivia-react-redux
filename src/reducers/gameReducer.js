import { RESET_COLORS, SHOW_ANSWERS, DISABLE_BUTTONS } from '../actions/index';

const INITIAL_STATE = ({
  styles: {
    rigth: '',
    wrong: '',
  },
  disabledButtons: false,
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
  case DISABLE_BUTTONS:
    return ({
      ...state,
      disabledButtons: true,
    });
  default:
    return state;
  }
};

export default gameStyles;
