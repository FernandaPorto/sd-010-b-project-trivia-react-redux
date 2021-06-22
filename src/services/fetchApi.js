const NUMBER_OF_QUESTIONS = 5;

async function fetchApiResolved(token) {
  return fetch(`https://opentdb.com/api.php?amount=${NUMBER_OF_QUESTIONS}&token=${token}`)
    .then((response) => response.json());
  // console.log(data);
  // localStorage.setItem('questions', JSON.stringify(data));
  // return data;
}

export default async function fetchApi() {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();
  // console.log(typeof (data.token));
  localStorage.setItem('token', data.token);
  return fetchApiResolved(data.token);
}
