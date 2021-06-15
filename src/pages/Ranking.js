import React, { Component } from 'react';
import { Redirect } from 'react-router';

export default class Ranking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      localStore: false,
      goHome: false,
    };
    this.goHome = this.goHome.bind(this);
  }

  componentDidMount() {
    const state = JSON.parse(localStorage.getItem('state'));
    this.fillLocal(state);
  }

  fillLocal(state) {
    this.setState({ localStore: state });
  }

  goHome() {
    this.setState({ goHome: true });
  }

  render() {
    const { localStore, goHome } = this.state;
    // ordenar o ranking antes de renderizar fazer isso na gravação da store
    const ranking = localStore ? localStore[0].ranking : [];
    return (
      <div>
        { goHome && <Redirect to="/" /> }
        <h1>Ranking</h1>
        <ol>
          { localStore && ranking
            .map(({ name, picture, score }, index) => (
              <li key={ name } className="ranking">
                <img src={ picture } alt={ name } />
                <div data-testid={ `player-name-${index}` }>{ name }</div>
                <div data-testid={ `player-score-${index}` }>{ score }</div>
                - pontos
              </li>)) }
        </ol>
        <button
          type="button"
          onClick={ this.goHome }
          data-testid="btn-go-home"
        >
          Início
        </button>
      </div>
    );
  }
}
