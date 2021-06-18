import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    return (
      <>
        <Header />
        <h1>Página de FeedBacks</h1>
        <Link to="/">
          Voltar
        </Link>
      </>
    );
  }
}

export default Feedback;
