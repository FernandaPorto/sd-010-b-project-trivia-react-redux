const INITIAL_STATE = {
  avatar: '',
  score: '',
};

const ranking = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case 'RANKING':
    return {
      avatar: payload.avatar,
      score: payload.score,
    };
  default:
    return state;
  }
};

export default ranking;
