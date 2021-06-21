function changeStr(string) {
  return string
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#039;/g, '\'')
    .replace(/&Aacute;/g, 'Á')
    .replace(/&aacute;/g, 'á')
    .replace(/&auml;/g, 'ä')
    .replace(/&Eacute;/g, 'É')
    .replace(/&eacute;/g, 'é')
    .replace(/&euml;/g, 'ë')
    .replace(/&Iacute;/g, 'Í')
    .replace(/&iacute;/g, 'í')
    .replace(/&iuml;/g, 'ï')
    .replace(/&Oacute;/g, 'Ó')
    .replace(/&oacute;/g, 'ó')
    .replace(/&ouml;/g, 'ö')
    .replace(/&Uacute;/g, 'Ú')
    .replace(/&uacute;/g, 'ú')
    .replace(/&uuml;/g, 'ü')
    .replace(/&reg/g, '®')
    .replace(/&rade/g, '™')
    .replace(/&deg;/g, '°');
}

export const getToken = async () => {
  const endPoint = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(endPoint);
  const result = await response.json();
  return result;
};

export const getAnswers = async (number, token) => {
  const endPoint = `https://opentdb.com/api.php?amount=${number}&token=${token}`;
  const response = await fetch(endPoint);
  const result = await response.json();
  result.results.forEach((question) => {
    question.question = changeStr(question.question);
    question.correct_answer = changeStr(question.correct_answer);
    question.incorrect_answers = question.incorrect_answers.map((opt) => changeStr(opt));
  });

  return result;
};
