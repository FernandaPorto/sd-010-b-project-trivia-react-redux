import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { updateUrlGravatar } from '../actions/player';

class Header extends Component {
  render() {
    const { name, score, urlGravatar } = this.props;
    // const { name, score, assertions, urlGravatar } = this.props;
    return (
      <header>
        <img
          src={ urlGravatar }
          alt={ `Avatar do Jogador ${name}` }
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{ name || 'Anônimo' }</p>
        {/* <p>
          {'Acertos: '}
          <span data-testid="feedback-total-question">{ assertions }</span>
        </p> */}
        <p>
          {'Score: '}
          <span data-testid="header-score">{ score }</span>
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  // assertions: PropTypes.number.isRequired,
  urlGravatar: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  assertions: state.player.assertions,
  urlGravatar: state.player.urlGravatar,
});

export default connect(mapStateToProps)(Header);
