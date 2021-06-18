import React, { Component } from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getRanking } from '../services/token';

export default class Ranking extends Component {
  render() {
    const array = getRanking();
    const ranking = array.sort((a, b) => b.score - a.score);
    console.log(ranking);
    return (
      <Container className="ranking">
        <p className="header-ranking" data-testid="ranking-title">Ranking</p>
        <div className="placar-container">
          {
            ranking.map((item, index) => (
              <div className="placar" key={ index }>
                <img src={ item.picture } alt={ item.name } />
                <p
                  className="placar-text-1"
                  data-testid={ `player-name-${index}` }
                >
                  {item.name}

                </p>
                <p
                  className="placar-text-2"
                  data-testid={ `player-score-${index}` }
                >
                  {item.score}

                </p>
              </div>
            ))
          }
        </div>
        <Button>
          <Link
            data-testid="btn-go-home"
            to="/"
          >
            Home
          </Link>
        </Button>
      </Container>
    );
  }
}
