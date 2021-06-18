import React from 'react';
import { Link } from 'react-router-dom';
import './ranking.css';

class RankingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // players: [],
    };
  }

  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking')) || [];

    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        {ranking
          .map(
            (e) => (
              <div key="ranking">
                <img src={ e.gravatarEmail } alt="Profile" key="profile" />
                <p key={ e.name } className="player-name">
                  { e.name }
                  ,
                  { e.score }
                </p>
              </div>
            ),
          ).sort((a, b) => b - a)}

        <Link to="/">
          <button type="button" data-testid="btn-go-home">Jogar novamente</button>
        </Link>
      </>
    );
  }
}

export default RankingPage;
