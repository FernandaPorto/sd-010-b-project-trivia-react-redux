import React, { Component } from 'react';

class Jogo extends Component {
  render() {
    const token = localStorage.getItem('token');
    return <div>{ `token: ${token}` }</div>;
  }
}

export default Jogo;
