import { ACTION_SCORE, ACTION_SCORE_ZERO } from './index';

export const updateScoreAction = (score) => ({
  type: ACTION_SCORE, score,
});

export const resetScoreAction = () => ({ type: ACTION_SCORE_ZERO });
