import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class RegressBar extends Component {
  render() {
    const { time } = this.props;
    const percentage = 30;
    return (
      <section className="regress">
        <section
          className="bar"
          style={ { width: `${(time / percentage) * 100}%` } }
        />
      </section>
    );
  }
}

const mapToStateProps = (state) => ({
  time: state.player.timeLeft,
});

RegressBar.propTypes = {
  time: PropTypes.number.isRequired,
};

export default connect(mapToStateProps)(RegressBar);
