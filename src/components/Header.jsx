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
    console.log(getGravatar(url));
  }

  render() {
    const { nome, gravatar } = this.props;
    return (
      <header>
        <img src={ gravatar } alt="imege" data-testid="header-profile-picture" />
        <p data-testid="header-player-name">{nome}</p>
        <p data-testid="header-score">{0}</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  nome: state.user.name,
  gravatar: state.user.gravatar,

});

const mapDispatchToProps = (dispatch) => ({
  getGravatar: (gravatar) => dispatch(gravatarAction(gravatar)),
});

Header.propTypes = ({
  email: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired,
  gravatar: PropTypes.string.isRequired,
  getGravatar: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
