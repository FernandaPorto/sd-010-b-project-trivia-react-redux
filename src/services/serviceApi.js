export const fetchToken = async () => {
  try {
    const tokenUrl = 'https://opentdb.com/api_token.php?command=request';
    const tokenResponse = await fetch(tokenUrl);
    const token = await tokenResponse.json();
    return token;
  } catch (error) {
    console.error(error);
  }
};

export const fetchAsks = async (token) => {
  const askUrl = `https://opentdb.com/api.php?amount=5&token=${token.token}`;
  const asks = await askUrl.json();
  return asks;
};
