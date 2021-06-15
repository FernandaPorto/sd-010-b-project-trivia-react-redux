import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import Answer from '../components/Answer';
import Question from '../components/Question';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      number: 0,
      results: undefined,
    };
  }

  componentDidMount() {
    this.fetchApi();
  }

  async fetchApi() {
    const token = localStorage.getItem('token');
    const api = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const { results } = await api.json();
    console.log(results);
    this.setState({
      results,
    });
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
});

export default connect(mapStateToProps)(Game);

Game.propTypes = {
  count: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};
