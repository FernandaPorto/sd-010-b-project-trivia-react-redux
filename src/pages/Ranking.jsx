import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  render() {
    const { name, gravatarEmail, score } = this.props;
    return (
      <div>
        { name + gravatarEmail + score }
        <h1 data-testid="ranking-title">Ranking</h1>
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
  score: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Ranking);
