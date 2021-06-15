const TOKEN = 'https://opentdb.com/api_token.php?command=request';

const getToken = () => fetch(TOKEN)
  .then((res) => res.json())
  .then(({ token }) => token);

export default getToken;
