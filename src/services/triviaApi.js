export const getToken = async () => {
  const endPoint = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(endPoint);
  const result = await response.json();
  return result;
};

export default getToken;
