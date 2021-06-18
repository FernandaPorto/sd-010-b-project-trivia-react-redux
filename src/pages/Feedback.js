import React, { Component } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getStorage } from '../services/token';

class Feedback extends Component {
  render() {
    const { player: { score, assertions } } = getStorage();
    const assert = 3;
    return (
      <Container className="feedback">
        <Header pontuacao={ score } />
        {/* <p data-testid="feedback-total-score">{ score }</p> */}
        <p className="acertos" data-testid="feedback-total-question">
          Acertos:
          {' '}
          { assertions }
        </p>
        <p className="feedback-text" data-testid="feedback-text">
          { assertions >= assert
            ? 'Mandou bem!🎉👏' : 'Podia ser melhor...😥' }
        </p>
        <Button>
          <Link
            data-testid="btn-play-again"
            to="/"
          >
            Jogar novamente
          </Link>
        </Button>
        <Button>
          <Link
            data-testid="btn-ranking"
            to="/ranking"
          >
            Ver Ranking
          </Link>
        </Button>
      </Container>
    );
  }
}

export default Feedback;
