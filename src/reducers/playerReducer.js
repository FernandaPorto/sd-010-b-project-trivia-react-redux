export const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
};

// name é o nome da pessoa que joga
// assertions é o número de acertos
// score é a pontuação
// gravatarEmail é o email da pessoa que joga

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

export default playerReducer;
