import { ACTION_SCORE } from './index';

const updateScore = (score) => ({
  type: ACTION_SCORE, score,
});

export default updateScore;
