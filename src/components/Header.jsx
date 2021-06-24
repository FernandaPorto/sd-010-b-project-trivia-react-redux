import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { gravatarAction } from '../actions';

class Header extends Component {
  constructor(props) {
    super(props);
    this.useLocalStorage = this.useLocalStorage.bind(this);
  }

  componentDidMount() {
    const { getGravatar, email } = this.props;
    const hashEmail = md5(email).toString();
    const url = `https://www.gravatar.com/avatar/${hashEmail}`;
    fetch(url).then(({ url: URL }) => getGravatar(URL));
  }

  useLocalStorage() {
    const { totalScore, totalAssertions } = this.props;
    const state = { player: {
      score: totalScore,
      assertions: totalAssertions,

    } };
    localStorage.setItem('state', JSON.stringify(state));
    // if (JSON.parse(localStorage.getItem('state')).length > 0) {
    //   return (JSON.parse(localStorage.getItem('state')).score);
    // }
  }

  render() {
    const { nome, gravatar } = this.props;
    console.log(JSON.parse(localStorage.getItem('state')));
    // const { player: { score } } = JSON.parse(localStorage.getItem('state'));
    return (
      <header>
        <img src={ gravatar } alt="imageGravatar" data-testid="header-profile-picture" />
        <span data-testid="header-player-name">
          User:
          { }
          {nome}
          { }
        </span>
        <span data-testid="header-score">
          {0}
          {this.useLocalStorage()}
          {Object.values(JSON.parse(localStorage.getItem('state'))).score}
          {/* {score} */}
        </span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  nome: state.user.name,
  gravatar: state.user.gravatar,
  totalScore: state.user.player.score,
  totalAssertions: state.user.player.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  getGravatar: (gravatar) => dispatch(gravatarAction(gravatar)),
});

Header.propTypes = ({
  email: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired,
  gravatar: PropTypes.string.isRequired,
  getGravatar: PropTypes.func.isRequired,
  totalScore: PropTypes.number.isRequired,
  totalAssertions: PropTypes.number.isRequired,
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
