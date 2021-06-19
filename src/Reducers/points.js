const POINTS = 'POINTS';
const CORRECT = 'CORRECT';
const intialState = {
  points: 0,
  correct: 0,
};

const pointsReducer = (state = intialState, { type, payload }) => {
  switch (type) {
  case POINTS:
    return { ...state,
      points: payload.points.player.score,
    };
  case CORRECT:
    return { ...state,
      correct: payload.correct,
    };

  default:
    return state;
  }
};

export default pointsReducer;
