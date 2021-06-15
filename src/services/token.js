const URL = 'https://opentdb.com/api_token.php?command=request';

export const getToken = () => fetch(URL)
  .then((res) => res.json())
  .then((data) => {
    const { token } = data;
    localStorage.token = token;
    return token;
  })
  .then((token) => fetch(`https://opentdb.com/api.php?amount=5&token=${token}`))
  .then((res) => res.json())
  .then(({ results }) => results);

export const getStorage = () => JSON.parse(localStorage.state);
