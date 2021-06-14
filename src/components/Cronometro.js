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
      // console.log('aqui')
      this.setState((state) => ({
        seconds: state.seconds - 1,
      }));
    }, SECOND);
  }

  componentDidUpdate(prevProps, prevState) {
    const { funcao } = this.props;
    if (prevState.seconds === 1) {
      funcao();
      this.update();
    }
  }

  update() {
    // this.setState({
    //   seconds: 30,
    // });
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
};

export default Cronometro;
