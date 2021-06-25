import React from 'react';
import { connect } from 'react-redux';

import './Header.css';

class Header extends React.Component {
  render() {
    const { gravatarURL, name, score } = this.props;

    return (
      <header>
        <div>
          <img className="gravatar-img" src={ gravatarURL } alt="player" />
          <span>{name}</span>
        </div>
        <span>{`Score: ${score}`}</span>
      </header>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  gravatarURL: player.gravatarURL,
  name: player.name,
  score: player.score,
});

export default connect(mapStateToProps)(Header);
