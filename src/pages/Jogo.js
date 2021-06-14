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
    };
  }

  componentDidMount() {
    getToken().then((game) => this.setState({ game, loading: false }));
  }

  render() {
    const { game, index, loading } = this.state;
    return (
      <div>
        <h1>rsrs</h1>
        <Header />
        {!loading && <Questions { ...game[index] } />}
        {/* {game.map((seila, idx) => <h2>{seila.correct_answer}</h2>)} */}
      </div>
    );
  }
}

export default Jogo;
