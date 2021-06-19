import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

class Ranking extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToHome: false,
    };

    this.redirectToHome = this.redirectToHome.bind(this);
  }

  createPlayerCardOnRanking({ name, picture, score }, index) {
    return (
      <div key={ index }>
        <img src={ picture } alt={ name } />
        <h4 data-testid={ `player-name-${index}` }>{ name }</h4>
        <p data-testid={ `player-score-${index}` }>{ score }</p>
      </div>
    );
  }

  redirectToHome() {
    this.setState({
      redirectToHome: true,
    });
  }

  render() {
    const { ranking } = this.props;
    const { redirectToHome } = this.state;

    const rankingByScore = ranking.sort(
      (player1, player2) => player2.score - player1.score,
    );

    if (redirectToHome) {
      return (
        <Redirect to="/" />
      );
    }

    return (
      <main>
        <h2 data-testid="ranking-title">
          Ranking
        </h2>
        <section>
          { ranking.length > 0 ? rankingByScore.map(
            (playerInfo, index) => this.createPlayerCardOnRanking(playerInfo, index),
          ) : null }
        </section>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.redirectToHome }
        >
          Página inicial
        </button>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  const { ranking } = state;
  return ({
    ranking,
  });
};

Ranking.propTypes = {
  ranking: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Ranking);
