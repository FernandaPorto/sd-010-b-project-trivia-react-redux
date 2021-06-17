import React from 'react';
import PropTypes from 'prop-types';

class Stopwatch extends React.Component {
  constructor() {
    super();

    this.playerTime = this.playerTime.bind(this);
  }

  componentDidMount() {
    this.playerTime();
  }

  // componentWillUnmount() {
  //   clearTimeout(playerTime());
  // }

  playerTime() {
    const { runTimer } = this.props;
    const SECOND = 1000;
    this.cronometerInterval = setInterval(() => {
      runTimer();
    }, SECOND);
  }

  render() {
    const { timer } = this.props;
    return (
      <div>
        { timer }
      </div>
    );
  }
}
Stopwatch.propTypes = {
  runTimer: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
};

export default Stopwatch;
