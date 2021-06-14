export async function fetchToken() {
  const request = await fetch('https://opentdb.com/api_token.php?command=request');
  const response = await request.json();
  return response;
}

export async function fetchQuestions(token) {
  const request = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const response = await request.json();
  return response;
}