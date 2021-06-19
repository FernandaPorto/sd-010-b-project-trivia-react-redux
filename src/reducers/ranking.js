let initialState = [];
const rankingFromLocalStorage = localStorage.getItem('ranking');
if (rankingFromLocalStorage) {
  initialState = JSON.parse(rankingFromLocalStorage);
}

export default function (state = initialState, action) {
  switch (action.type) {
  case ('ADD_TO_RANKING'): {
    const { name, score, picture } = action.payload;
    return [
      ...state,
      {
        name,
        score,
        picture,
      },
    ];
  }
  default:
    return state;
  }
}
