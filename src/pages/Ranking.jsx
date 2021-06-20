import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  constructor() {
    super();
    this.order = this.order.bind(this);
    this.state = {
      rankList: [],
    };
  }

  componentDidMount() {
    this.order();
  }

  order() {
    const negativeOne = -1;
    const rankList = JSON.parse(localStorage.getItem('ranking'))
      .sort((a, b) => {
        if (a.score < b.score) return 1;
        if (a.score > b.score) return negativeOne;
        return 0;
      });
    this.setState({ rankList });
  }

  render() {
    const { rankList } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">
          Ranking
        </h1>
        { rankList.map(({ name, score, picture }, i) => (
          <div key={ i }>
            <img
              src={ picture }
              alt="profile user"
            />
            <span data-testid={ `player-name-${i}` }>
              { name }
            </span>
            <span data-testid={ `player-score-${i}` }>
              { score }
            </span>
          </div>
        ))}
        <Link to="/">
          <button type="button" data-testid="btn-go-home">
            Jogar novamente
          </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
