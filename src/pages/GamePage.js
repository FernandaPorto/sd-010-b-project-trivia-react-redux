import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Question from '../components/Question';
import { getPlayerDataLocalStorage } from '../helpers/localStorage';

class GamePage extends React.Component {
  render() {
    const { score } = this.props;
    const name = getPlayerDataLocalStorage('name');
    return (
      <>
        <header>
          <img src="https://www.gravatar.com/avatar/" data-testid="header-profile-picture" alt="gravatar" />
          <p data-testid="header-player-name">{ name }</p>
          <p data-testid="header-score">{ score }</p>
        </header>
        <Question />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
});

export default connect(mapStateToProps)(GamePage);

GamePage.propTypes = {
  score: propTypes.number.isRequired,
};
