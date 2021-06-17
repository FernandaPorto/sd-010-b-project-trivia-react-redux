import React, { Component } from 'react';
import HeaderComponent from '../components/HeaderComponent';

export class Feedback extends Component {
  render() {
    return (
      <div>
        <HeaderComponent />
        <p data-testid="feedback-text">Aqui vai a msg</p>
      </div>
    );
  }
}

export default Feedback;
