export const CORRECT = 'CORRECT';
export const TIMER = 'TIMER';

const correctAnswers = (score) => ({
  type: CORRECT,
  points: {
    score,
  },
});

export const timerActions = (numero) => ({
  type: TIMER,
  time: numero,
});

export default correctAnswers;
