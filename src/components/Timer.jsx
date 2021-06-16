import React from 'react';
import PropTypes from 'prop-types';

class Timer extends React.Component {
  componentDidMount() {
    const { hasMounted } = this.props;
    hasMounted();
  }

  render() {
    const { time } = this.props;
    return (
      <div>
        { time }
      </div>
    );
  }
}

Timer.propTypes = {
  time: PropTypes.number.isRequired,
  hasMounted: PropTypes.func.isRequired,
};

export default Timer;
