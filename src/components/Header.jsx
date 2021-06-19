import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { gravatarAction } from '../actions';

class Header extends Component {
  componentDidMount() {
    const { getGravatar, email } = this.props;
    const hashEmail = md5(email).toString();
    const url = `https://www.gravatar.com/avatar/${hashEmail}`;
    fetch(url).then(({ url: URL }) => getGravatar(URL));
  }

  render() {
    const { nome, gravatar, totalScore } = this.props;
    return (
      <header>
        <img src={ gravatar } alt="imege" data-testid="header-profile-picture" />
        <span data-testid="header-player-name">{nome}</span>
        <span data-testid="header-score">{totalScore}</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  nome: state.user.player.name,
  gravatar: state.user.gravatar,
  totalScore: state.user.player.score,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
