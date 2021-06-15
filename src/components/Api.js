export async function getToken() {
  return fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json())
    .catch((error) => error);
}

export async function getPerguntas(token) {
  return fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
    .then((response) => response.json())
    .catch((error) => error);
}
