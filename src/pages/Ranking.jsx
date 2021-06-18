import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  render() {
    const { name, gravatarEmail, score } = this.props;
    return (
      <div data-testid="ranking-title">
        { name + gravatarEmail + score }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { player: { name, gravatarEmail, score } } = state;
  return ({
    name,
    gravatarEmail,
    score,
  });
};

Ranking.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Ranking);
