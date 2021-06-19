import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import orderScore from '../functions/orderScore';

export default class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      redirectToHome: false,
    };
    this.redirectHome = this.redirectHome.bind(this);
  }

  redirectHome() {
    this.setState({
      redirectToHome: true,
    });
  }

  render() {
    const InfoLocalStorage = localStorage.getItem('state');
    const objectInfos = JSON.parse(InfoLocalStorage);
    orderScore();
    const { redirectToHome } = this.state;
    if (redirectToHome) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {console.log(objectInfos)}
        {
          objectInfos.map((item, index) => (
            <div key={ index }>
              <img src={ item.player.gravatarEmail } alt="avatar player" />
              <span>{`Jogador: ${item.player.name}`}</span>
              <span>{` - Pontuação: ${item.player.score}`}</span>
            </div>
          ))
        }
        <button type="button" data-testid="btn-go-home" onClick={ this.redirectHome }>
          Voltar
        </button>
      </div>
    );
  }
}
