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
          <h4>{name}</h4>
        </div>
        <div>{`Score: ${score}`}</div>
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
