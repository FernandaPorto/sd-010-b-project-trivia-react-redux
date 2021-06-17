import React from 'react';
import { Link } from 'react-router-dom';

class RankingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // players: [],
    };
  }

  render() {
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        <p>aaa</p>

        <Link to="/">
          <button type="button" data-testid="btn-go-home">Jogar novamente</button>
        </Link>
      </>
    );
  }
}

export default RankingPage;
