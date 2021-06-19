import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

class CardList extends Component {
  render() {
    const { ranking } = this.props;
    return (
      <section>
        {ranking.forEach(
          (player, index) => (
            <Card
              key={ index }
              player={ player }
            />
          ),
        )}
      </section>
    );
  }
}

CardList.propTypes = {
  ranking: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
}.isRequired;

export default CardList;
