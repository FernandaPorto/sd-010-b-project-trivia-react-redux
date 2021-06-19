function orderScore() {
  const InfoLocalStorage = localStorage.getItem('state');
  const objectInfos = JSON.parse(InfoLocalStorage);
  // Função responsável para ordernar o array score
  const onlyScore = objectInfos.map((item) => item.player.score);
  const orderScore = onlyScore.sort((a, b) => b - a);
  // Lógica inválida pois ordena o score e aplica ao primeiro player(e se ele não for o que tirou máxima pontuação??)
  const newObjectInfos = objectInfos.map((item, index) => ({
    gravatarEmail: item.player.gravatarEmail,
    name: item.player.name,
    score: orderScore[index],
  }));
  return newObjectInfos;
}

export default orderScore;
