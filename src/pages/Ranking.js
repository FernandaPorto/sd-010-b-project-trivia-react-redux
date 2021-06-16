import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <section>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Início
        </button>
      </section>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape(Object).isRequired,
};

export default Ranking;
