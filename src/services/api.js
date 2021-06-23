export async function fetchToken() {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();
  return data.token;
}

export async function fetchCategories() {
  const response = await fetch('https://opentdb.com/api_category.php');
  const data = await response.json();
  return data.trivia_categories;
}

export async function fetchCategoryQuestionCount(category) {
  const response = await fetch(`https://opentdb.com/api_count.php?category=${category}`);
  const data = await response.json();
  return data;
}

export async function fetchGlobalQuestionCount() {
  const response = await fetch('https://opentdb.com/api_count_global.php');
  const data = await response.json();
  return data;
}

export async function fetchQuestions(token, { amount, category, difficulty, type }) {
  try {
    const URL = `https://opentdb.com/api.php?token=${token}&amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
