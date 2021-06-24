const TOKEN_EMPTY_CODE = 4;

export async function fetchToken() {
  try {
    const response = await fetch(
      'https://opentdb.com/api_token.php?command=request',
    );
    const data = await response.json();
    return data.token;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchCategories() {
  try {
    const response = await fetch(
      'https://opentdb.com/api_category.php',
    );
    const data = await response.json();
    return data.trivia_categories;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchCategoryQuestionCount(categoryId) {
  try {
    const response = await fetch(
      `https://opentdb.com/api_count.php?category=${categoryId}`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

// export async function fetchGlobalQuestionCount() {
//   try {
//     const response = await fetch(
//       'https://opentdb.com/api_count_global.php',
//     );
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// }

export async function fetchQuestions(token, { amount, categoryId, difficulty }) {
  try {
    let mainURL = `https://opentdb.com/api.php?token=${token}&amount=${amount}`;
    mainURL += `&category=${categoryId}&difficulty=${difficulty}`;
    let response = await fetch(mainURL);
    let data = await response.json();
    // console.log(data);

    if (data.response_code === TOKEN_EMPTY_CODE) {
      await fetch(
        `https://opentdb.com/api_token.php?command=reset&token=${token}`,
      );
      response = await fetch(mainURL);
      data = await response.json();
      // console.log(data);
    }

    return data;
  } catch (error) {
    console.log(error);
  }
}
