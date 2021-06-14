const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  assertions: 0,
  score: 0,
}

function userReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'LOGIN':
      return {
        ...state, 
        name: action.name,
        gravatarEmail: action.email
      }
      case 'SCORE':
      return {
        ...state,
        score: action.score,      
      }
      case 'ASSERTIONS':
      return {
        ...state,
        assertions: action.assertions,      
      }     
      default:
        return state;
  }
  
} 

export default userReducer;
