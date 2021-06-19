import { getGravatar } from './getGravatar';

function addInfoToLocalStorage(name, email, score, numberOfAssertions) {
  const objLocalStorage = {
    player: {
      name,
      assertions: numberOfAssertions,
      score,
      gravatarEmail: getGravatar(email),
    },
  };
  const verifyItem = JSON.parse(localStorage.getItem('state'));
  const setItem = localStorage.setItem('state', JSON.stringify(objLocalStorage));
  const result = !verifyItem ? setItem : verifyItem;
  if (!result) {
    localStorage.setItem('state', JSON.stringify([objLocalStorage]));
  } else {
    localStorage.setItem('state', JSON.stringify([...result, objLocalStorage]));
  }
}
export default addInfoToLocalStorage;
