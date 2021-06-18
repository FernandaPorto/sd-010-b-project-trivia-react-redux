export function changeClassNameCorrect(clicked) {
  if (clicked) {
    return 'correct_answer';
  }
  return '';
}

export function changeClassNameInCorrect(clicked) {
  if (clicked) {
    return 'incorrect_answer';
  }
  return '';
}
