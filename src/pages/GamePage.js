import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Question from '../components/Question';
import Cronometer from '../components/Cronometer';

class GamePage extends React.Component {
  render() {
    const { name, score } = this.props;
    return (
      <>
        <header>
          <img src="https://www.gravatar.com/avatar/" data-testid="header-profile-picture" alt="gravatar" />
          <p data-testid="header-player-name">{ name }</p>
          <p data-testid="header-score">{ score }</p>
        </header>
        <Question />
        <Cronometer />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(GamePage);

GamePage.propTypes = {
  name: propTypes.string.isRequired,
  score: propTypes.number.isRequired,
};
