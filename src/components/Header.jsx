import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { gravatarURL, name, score } = this.props;
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
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
