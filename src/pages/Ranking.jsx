import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      redirectToHome: false,
    };
    this.redirectHome = this.redirectHome.bind(this);
  }

  redirectHome() {
    this.setState({
      redirectToHome: true,
    });
  }

  render() {
    const { redirectToHome } = this.state;
    if (redirectToHome) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button type="button" data-testid="btn-go-home" onClick={ this.redirectHome }>
          Voltar
        </button>
      </div>
    );
  }
}
