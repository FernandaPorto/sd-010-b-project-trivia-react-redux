import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

import Question from '../components/Question';
import Answer from '../components/Answer';
import Timer from '../components/Timer';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      number: 0,
      results: props.request,
    };
  }

  render() {
    const { count, name, email } = this.props;
    const { number, results } = this.state;
    const hashEmail = md5(email).toString();
    return (
      <div>
        <header>
          <img
            src={ `https://www.gravatar.com/avatar/${hashEmail}` }
            alt="foto"
            data-testid="header-profile-picture"
          />
          <span
            data-testid="header-player-name"
          >
            { name }
          </span>
          <span
            data-testid="header-score"
          >
            { count }
          </span>
        </header>
        { results && (
          <div>
            <Question number={ number } results={ results } />
            <Answer number={ number } results={ results } />
            <Timer results={ results } />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  count: state.player.score,
  name: state.player.name,
  email: state.player.gravatarEmail,
  request: state.apiReducer.request,
});

export default connect(mapStateToProps)(Game);

Game.propTypes = {
  count: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  request: PropTypes.arrayOf(PropTypes.any).isRequired,
};
