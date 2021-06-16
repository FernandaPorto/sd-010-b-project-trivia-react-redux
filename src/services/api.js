export default async function fetchToken(targetURL) {
  const response = await fetch(targetURL);
  const data = await response.json();
  return data;
}
