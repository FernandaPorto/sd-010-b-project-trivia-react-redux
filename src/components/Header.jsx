import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gravatarAction } from '../actions';

class Header extends Component {
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    const { name, gravatar } = this.props;
    return (
      <header>
        <img src={ gravatar } alt={ name } data-testid="header-profile-picture" />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">{0}</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  name: state.user.name,
  gravatar: state.user.gravatar,
});

const mapDispatchToProps = (dispatch) => ({
  getGravatar: (gravatar) => dispatch(gravatarAction(gravatar)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
