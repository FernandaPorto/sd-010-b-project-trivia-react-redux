export function bootingPlayerLocalStorage() {
  const INITIAL_STATE = {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  };
  localStorage.setItem('state', JSON.stringify({ player: INITIAL_STATE }));
}

export function updatePlayerDataLocalStorage(property, data) {
  const state = JSON.parse(localStorage.getItem('state'));
  const updatedPlayer = {
    ...state.player,
    [property]: data,
  };
  localStorage.setItem('state', JSON.stringify({ player: updatedPlayer }));
}

export function updateAssertionsAndScore(difficulty, seconds) {
  const TEN = 10;
  const state = JSON.parse(localStorage.getItem('state'));
  const updatedPlayer = {
    ...state.player,
    score: state.player.score + (TEN + (difficulty * seconds)),
    assertions: state.player.assertions + 1,
  };
  localStorage.setItem('state', JSON.stringify({ player: updatedPlayer }));
}

export function getPlayerDataLocalStorage(property) {
  const state = JSON.parse(localStorage.getItem('state'));
  return state.player[property];
}
