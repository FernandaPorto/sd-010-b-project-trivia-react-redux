function combinar(questions, numberQuestion) {
  const array = [questions[numberQuestion].correct_answer,
    ...questions[numberQuestion].incorrect_answers];
  const magicNumber = 0.5;
  const answers = array.sort(() => Math.random() - magicNumber);
  return answers;
}

export default combinar;
