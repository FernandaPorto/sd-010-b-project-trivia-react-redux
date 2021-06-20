const BASE_URL = 'https://opentdb.com/api_token.php?command=request';

const fetchURL = async () => {
  const result = await fetch(BASE_URL);
  return result.json();
};

export default fetchURL;

// const APITRIVIA = `https://opentdb.com/api.php?amount=5&token=${token}`;

// export const fetchAPITrivia = async () => {
//   const result = await fetch(APITRIVIA);
//   return result.json();
// };
export const setToken = async () => {
  const token = await fetchURL();
  localStorage.setItem('token', JSON.stringify(token));
  const fetchTrivia = await fetch(`https://opentdb.com/api.php?amount=5&token=${token.token}`);
  const resposta = await fetchTrivia.json();
  const result = await resposta;
  return result;
};
