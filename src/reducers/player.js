// Esse reducer será responsável por tratar as informações da pessoa usuária
import {
  SAVE_EMAIL,
  SAVE_NAME,
  SAVE_IMG,
  REQUEST_TOKEN_SUCCESS,
  SAVE_SCORE,
  SAVE_ASSERTIONS,
} from '../actions/index';

const initialState = {
  email: 'gustavomc_53@hotmail.com',
  name: 'Gustavo ',
  gravatarEmail: 'def584e93ab1b50012af443500b16fca',
  assertions: 0,
  token: 'd139ac0eee1d52d9399eed3fc7eab0bfcc01fc188cd3ee03611f79582268fca1',
  isFetching: false,
};

function player(state = initialState, action) {
  switch (action.type) {
  case SAVE_EMAIL:
    return {
      ...state,
      email: action.payload,
    };

  case SAVE_NAME:
    return {
      ...state,
      name: action.payload,
    };

  case SAVE_IMG:
    return {
      ...state,
      gravatarEmail: action.payload,
    };

  case SAVE_SCORE:
    return {
      ...state,
      score: action.payload,
    };

  case SAVE_ASSERTIONS:
    return {
      ...state,
      assertions: action.payload,
    };

  case REQUEST_TOKEN_SUCCESS:
    return {
      ...state,
      ...action.payload,
    };

  default:
    return state;
  }
}

export default player;
