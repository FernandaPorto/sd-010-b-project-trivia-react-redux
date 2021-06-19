import React, { Component } from 'react';
import md5 from 'crypto-js/md5';

class GameHeader extends Component {
  constructor(props) {
    super(props);

    this.userName = this.userName.bind(this);
  }

  userEmail() {
    const player = localStorage.getItem('state');
    const newPlayer = JSON.parse(player);
    const userEmail = md5(newPlayer.player.gravatarEmail).toString();
    return userEmail;
  }

  userName(user) {
    const player = localStorage.getItem('state');
    const newPlayer = JSON.parse(player);
    if (user === 'name') {
      return newPlayer.player.name;
    }
    if (user === 'score') {
      return newPlayer.player.score;
    }
  }

  render() {
    return (
      <main className="main-header">
        <section data-testid="header-profile-picture">
          <img src={ `https://www.gravatar.com/avatar/${this.userEmail()}` } alt="userimg" />
        </section>
        <section data-testid="header-player-name">
          { this.userName('name') }
        </section>
        <section data-testid="header-score">
          Score :
          {' '}
          {this.userName('score')}
        </section>
      </main>
    );
  }
}

export default GameHeader;
