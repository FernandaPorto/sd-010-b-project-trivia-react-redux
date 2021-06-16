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
      this.setState((state) => ({
        seconds: state.seconds - 1,
      }));
    }, SECOND);
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
    clearInterval(this.interval);
  }

  render() {
    const { seconds } = this.state;
    return (
      <div>
        <p>{ seconds }</p>
      </div>
    );
  }
}

Cronometro.propTypes = {
  funcao: PropTypes.func.isRequired,
  funcaoStop: PropTypes.func.isRequired,
  stop: PropTypes.bool.isRequired,
};

export default Cronometro;
