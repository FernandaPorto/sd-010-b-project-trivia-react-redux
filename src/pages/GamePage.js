import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Question from '../components/Question';

class GamePage extends React.Component {
  render() {
    const { name } = this.props;
    return (
      <>
        <header>
          <img src="https://www.gravatar.com/avatar/" data-testid="header-profile-picture" alt="gravatar" />
          <p data-testid="header-player-name">{ name }</p>
          <p data-testid="header-score">0</p>
        </header>
        <Question />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
});

export default connect(mapStateToProps)(GamePage);

GamePage.propTypes = {
  name: propTypes.string.isRequired,
};
