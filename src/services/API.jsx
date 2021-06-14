const BASE_URL = 'https://opentdb.com/api_token.php?command=request';

const fetchURL = async () => {
  const result = await fetch(BASE_URL);
  return result.json();
};

export default fetchURL;
