import { GET_API_RESULT } from '../actions/index';

const INITIAL_STATE = {};

export default function getApi(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_API_RESULT:
    return {
      ...state,
      response_code: action.payload.response_code,
      results: action.payload.results };
  default:
    return state;
  }
}
