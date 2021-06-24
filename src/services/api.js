const TOKEN_EMPTY_CODE = 4;

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

export async function fetchCategoryQuestionCount(categoryId) {
  const response = await fetch(`https://opentdb.com/api_count.php?category=${categoryId}`);
  const data = await response.json();
  return data;
}

// export async function fetchGlobalQuestionCount() {
//   const response = await fetch('https://opentdb.com/api_count_global.php');
//   const data = await response.json();
//   return data;
// }

export async function fetchQuestions(token, { amount, categoryId, difficulty }) {
  try {
    const mainURL = `https://opentdb.com/api.php?token=${token}&amount=${amount}&category=${categoryId}&difficulty=${difficulty}`;
    let response = await fetch(URL);
    let data = await response.json();
    console.log(data);

    if (data.response_code === TOKEN_EMPTY_CODE) {
      await fetch(`https://opentdb.com/api_token.php?command=reset&token=${token}`);
      response = await fetch(mainURL);
      data = await response.json();
      console.log(data);
    }

    return data;
  } catch (error) {
    console.log(error);
  }
}
