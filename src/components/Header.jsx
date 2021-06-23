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
    const { nome, gravatar, eachPoints } = this.props;
    console.log(eachPoints, nome, gravatar);
    return (
      <header>
        <img src={ gravatar } alt="imageGravatar" data-testid="header-profile-picture" />
        <span data-testid="header-player-name">{nome}</span>
        <span data-testid="header-score">{eachPoints}</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  nome: state.user.name,
  gravatar: state.user.gravatar,
  eachPoints: state.user.player.eachScore,
});

const mapDispatchToProps = (dispatch) => ({
  getGravatar: (gravatar) => dispatch(gravatarAction(gravatar)),
});

Header.propTypes = ({
  email: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired,
  gravatar: PropTypes.string.isRequired,
  getGravatar: PropTypes.func.isRequired,
  eachPoints: PropTypes.number.isRequired,
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
