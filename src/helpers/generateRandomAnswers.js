export default function generateRandomAnswers(correctAnswer, incorrectAnswer) {
  const range = 50;
  const getRandom = () => Math.ceil(Math.random() * range);
  if (incorrectAnswer.length < 2) {
    return [
      { id: getRandom(), answer: correctAnswer, dataTestId: 'correct-answer' },
      { id: getRandom(), answer: incorrectAnswer, dataTestId: 'wrong-answer-0' },
    ].sort((a, b) => +(a.id > b.id) || +(a.id === b.id) - 1); // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  }
  return [
    { id: getRandom(), answer: correctAnswer, dataTestId: 'correct-answer' },
    { id: getRandom(), answer: incorrectAnswer[0], dataTestId: 'wrong-answer-0' },
    { id: getRandom(), answer: incorrectAnswer[1], dataTestId: 'wrong-answer-1' },
    { id: getRandom(), answer: incorrectAnswer[2], dataTestId: 'wrong-answer-2' },
  ].sort((a, b) => +(a.id > b.id) || +(a.id === b.id) - 1); // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
}
