import React from 'react';
import Header from '../components/Header';

export default class Feedback extends React.Component {
  render() {
    return (
      <div data-testid="feedback-text">
        <Header />
        <h1>Muito bom</h1>
      </div>
    );
  }
}
