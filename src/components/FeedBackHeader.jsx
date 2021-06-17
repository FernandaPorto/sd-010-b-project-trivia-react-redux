import React, { Component } from 'react';
import md5 from 'crypto-js/md5';

class FeedBackHeader extends Component {
  constructor(props) {
    super(props);

    this.userName = this.userName.bind(this);
  }

  userEmail() {
    const player = localStorage.getItem('player');
    const newPlayer = JSON.parse(player);
    const userEmail = md5(newPlayer.gravatarEmail).toString();
    return userEmail;
  }

  userName(user) {
    const player = localStorage.getItem('player');
    const newPlayer = JSON.parse(player);
    if (user === 'name') {
      return newPlayer.name;
    }
    if (user === 'score') {
      return newPlayer.score;
    }
  }

  render() {
    return (
      <main>
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

export default FeedBackHeader;
