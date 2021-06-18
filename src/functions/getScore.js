function getScore(state, props) {
  const { numberOfAssertions, numberQuestion, score, timerInitial } = state;
  const { questions } = props;
  const defaultNumber = 10;
  const hardQuestion = 3;
  const mediumQuestion = 2;
  const easyQuestion = 1;
  let { difficulty } = questions[numberQuestion];
  if (difficulty === 'hard') {
    difficulty = hardQuestion;
  } if (difficulty === 'medium') {
    difficulty = mediumQuestion;
  } else {
    difficulty = easyQuestion;
  }
  return {
    numberOfAssertions: numberOfAssertions + 1,
    score: score + (defaultNumber + (timerInitial * difficulty)),
  };
}

export default getScore;
