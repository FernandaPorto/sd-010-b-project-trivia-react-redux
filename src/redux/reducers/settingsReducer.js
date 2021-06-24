import {
  GET_CATEGORIES,
  SAVE_SETTINGS,
} from '../actions';

const INITIAL_STATE = {
  allCategories: [],
  amount: 5,
  categoryId: '',
  difficulty: '',
  isLoading: true,
};

function settingsReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case GET_CATEGORIES:
    return {
      ...state,
      allCategories: payload.categories,
      isLoading: false,
    };
  case SAVE_SETTINGS:
    return {
      ...state,
      ...payload.inputSettings,
    };
  default:
    return state;
  }
}

export default settingsReducer;
