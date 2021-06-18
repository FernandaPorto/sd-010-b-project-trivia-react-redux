function addInfoToLocalStorage(name, email, score, numberOfAssertions) {
  const objLocalStorage = {
    player: {
      name,
      assertions: numberOfAssertions,
      score,
      gravatarEmail: email,
    },
  };
  localStorage.setItem('state', JSON.stringify(objLocalStorage)); // Referência https://www.horadecodar.com.br/2020/07/21/como-salvar-um-objeto-na-localstorage/
}

export default addInfoToLocalStorage;
