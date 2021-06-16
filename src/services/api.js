export default async function fetchData(targetURL) {
  const response = await fetch(targetURL);
  const data = await response.json();
  return data;
}
