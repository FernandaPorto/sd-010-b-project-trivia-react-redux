import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class HeaderGame extends React.Component {
  render() {
    const { url, name, score } = this.props;
    return (
      <header>
        <img src={ url } alt="UserFoto" data-testid="header-profile-picture" />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  url: state.triviaGame.url,
  name: state.triviaGame.name,
  score: state.triviaGame.score,
});

HeaderGame.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(HeaderGame);
