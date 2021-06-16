import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.photoSearch = this.photoSearch.bind(this);
    this.state = {
      photo: '',
    };
  }

  componentDidMount() {
    this.photoSearch();
  }

  photoSearch() {
    const { email } = this.props;
    const hash = md5(email).toString();
    this.setState({ photo: hash });
  }

  render() {
    const { name } = this.props;
    const { photo } = this.state;
    const score = JSON.parse(localStorage.getItem('state')).player.score;
    const assertions = JSON.parse(localStorage.getItem('state')).player.assertions;
    return (
      <div>
        <h1>Resultado</h1>
        <div data-testid="feedback-text"> { assertions < 3 ? 'Podia ser melhor...' : 'Mandou bem!' }</div>
        <img src={ `https://www.gravatar.com/avatar/${photo}` } data-testid="header-profile-picture" alt="my profile" />
        <p data-testid="header-player-name">{ name }</p>
        <div data-testid="header-score"> { score }</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  name: state.user.name,
});

export default connect(mapStateToProps)(Feedback);