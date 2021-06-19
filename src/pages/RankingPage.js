import React from 'react';
import { Link } from 'react-router-dom';
import HeaderComponent from '../components/HeaderComponent';
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
        <header>
          <HeaderComponent />
        </header>
        <h1 data-testid="ranking-title" className="title">Ranking</h1>
        {ranking
          .map(
            (e, index) => (
              <div key="ranking" className="ranking">
                <img src={ e.gravatarEmail } alt="Profile" key="profile" />
                <p
                  key={ e.name }
                  data-testid={ `player-name-${index}` }
                >
                  { e.name }
                  ,
                </p>
                <p
                  key={ e.score }
                  data-testid={ `player-score-${index}` }
                >
                  { e.score }
                </p>
              </div>
            ), console.log(ranking),
          )}
        <Link to="/">
          <button type="button" data-testid="btn-go-home">Jogar novamente</button>
        </Link>
      </>
    );
  }
}

export default RankingPage;
