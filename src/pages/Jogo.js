import React, { Component } from 'react';
import { getToken } from '../services/token';
import Header from '../components/Header';
import Questions from '../components/Questions';

class Jogo extends Component {
  constructor() {
    super();
    this.state = {
      game: [],
      index: 0,
      loading: true,
      value: 0,
    };
    this.change = this.change.bind(this);
  }

  componentDidMount() {
    getToken().then((game) => this.setState({ game, loading: false }));
  }

  change(val) {
    console.log(val);
    this.setState({ value: val });
  }

  render() {
    const { game, index, loading, value } = this.state;
    return (
      <div>
        <Header pontuacao={ value } />
        {!loading && <Questions { ...game[index] } funcao={ this.change } />}
      </div>
    );
  }
}

export default Jogo;
