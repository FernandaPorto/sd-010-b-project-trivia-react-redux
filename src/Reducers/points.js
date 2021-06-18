const POINTS = 'POINTS';
const intialState = {
  points: 0,
  correct: 1,
};

const pointsReducer = (state = intialState, { type, payload }) => {
  switch (type) {
  case POINTS:
    return { ...state,
      points: payload.points.player.score,
    };

  case 'CORRECT':
    return { ...state,
      correct: payload.certo,
    };

  default:
    return state;
  }
};

export default pointsReducer;
