import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const localState = JSON.parse(localStorage.getItem('state'));
    const { gravatarURL } = this.props;
    const { name, score } = localState.player;
    console.log(score);
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
  gravatarURL: state.player.gravatarURL,
});

Header.propTypes = {
  gravatarURL: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
