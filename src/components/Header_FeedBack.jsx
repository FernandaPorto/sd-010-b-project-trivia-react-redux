import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { gravatarAction } from '../actions';

class HeaderFeedBack extends Component {
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
    const { totalScore } = this.props;
    const player = {
      score: totalScore,
    };
    localStorage.setItem('state', JSON.stringify(player));
    if (JSON.parse(localStorage.getItem('state')).length > 0) {
      return (JSON.parse(localStorage.getItem('state')).score);
    }
  }

  render() {
    const { nome, gravatar, totalScore } = this.props;
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
          Score:
          { }
          {totalScore}
          {' '}
          {Object.values(JSON.parse(localStorage.getItem('state')))}
          {' '}
          {(JSON.parse(localStorage.getItem('state')).score)}
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
  eachPoints: state.user.player.eachScore,
});

const mapDispatchToProps = (dispatch) => ({
  getGravatar: (gravatar) => dispatch(gravatarAction(gravatar)),
});

HeaderFeedBack.propTypes = ({
  email: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired,
  gravatar: PropTypes.string.isRequired,
  getGravatar: PropTypes.func.isRequired,
  totalScore: PropTypes.number.isRequired,
  // eachPoints: PropTypes.number.isRequired,
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderFeedBack);
