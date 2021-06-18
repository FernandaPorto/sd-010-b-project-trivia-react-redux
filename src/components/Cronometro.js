import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Cronometro extends Component {
  constructor() {
    super();

    this.state = {
      seconds: 30,
    };
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    const SECOND = 1000;
    this.interval = setInterval(() => {
      const { restart } = this.props;
      if (restart) {
        this.setState((state) => ({
          seconds: state.seconds - 1,
        }));
      }
    },
    SECOND);
  }

  componentDidUpdate(prevProps, prevState) {
    const { funcao, funcaoStop, stop } = this.props;
    if (prevState.seconds === 1) {
      funcao();
      this.update();
    }
    if (!prevProps.stop && stop) {
      this.update();
      funcaoStop(prevState.seconds);
    }
  }

  update() {
    const SECOND = 30;
    this.setState({
      seconds: SECOND,
    });
  }

  render() {
    const { seconds } = this.state;
    let time = `00:${seconds}`;
    let id = 'color-cronometro';
    if (seconds <= 15 && seconds > 5) {
      id = 'color-cronometro-15';
    }

    if (seconds <= 5) {
      id = 'color-cronometro-5';
    }

    if (seconds < 10) {
      time = `00:0${seconds}`;
    }
    return (
      <div className="cronometro-container">
        <p className="cronometro" id={ id }>{ time }</p>
      </div>
    );
  }
}

Cronometro.propTypes = {
  funcao: PropTypes.func.isRequired,
  funcaoStop: PropTypes.func.isRequired,
  restart: PropTypes.bool.isRequired,
  stop: PropTypes.bool.isRequired,
};

export default Cronometro;
