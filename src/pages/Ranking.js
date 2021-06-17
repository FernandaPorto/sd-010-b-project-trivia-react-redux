import React from 'react';
import Header from '../components/Header';

class Ranking extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <>
        <Header />
        {/* <ul>
          <li>
            <p data-testid={ `player-name-${index}` }>
              {player}
            </p>
            <span data-testid={ `player-score-${index}` }>
              {score}
            </span>
          </li>
        </ul> */}
      </>
    );
  }
}

export default Ranking;
