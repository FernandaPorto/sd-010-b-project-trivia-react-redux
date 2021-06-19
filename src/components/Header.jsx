import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { name, gravatarURL, score } = this.props;
    return (
      <header>
        <div>
          <img src={ gravatarURL } alt="player" />
        </div>
        <div>
          <h4>{name}</h4>
        </div>
        <div>{score}</div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarURL: state.player.gravatarURL,
  score: state.player.score,
});

Header.propTypes = {
  name: PropTypes.string,
  gravatarURL: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Header);
