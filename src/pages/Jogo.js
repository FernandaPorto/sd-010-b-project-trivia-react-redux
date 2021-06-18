import React, { Component } from 'react';
import { getToken } from '../services/token';
import Header from '../components/Header';
import Questions from '../components/Questions';

class Jogo extends Component {
  constructor() {
    super();
    this.state = {
      game: [],
      loading: true,
      value: 0,
    };
    this.change = this.change.bind(this);
  }

  componentDidMount() {
    getToken().then((game) => {
      console.log(game);
      this.setState({ game, loading: false });
    });
  }

  change(val) {
    this.setState({ value: val });
  }

  render() {
    const { game, loading, value } = this.state;
    console.log(this.state);
    return (
      <div className="game-container">
        <Header pontuacao={ value } />
        {!loading && <Questions { ...game } funcao={ this.change } />}
      </div>
    );
  }
}

export default Jogo;
