import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    return (
      <div>
        <Header />
        <h2 data-testid="feedback-text">
          Mensagem de Feedback
        </h2>
        <Link to="/"><button type="button">Voltar</button></Link>
      </div>
    );
  }
}

export default Feedback;
