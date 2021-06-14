import React, { Component } from 'react';
import { Redirect } from 'react-router';
import logo from '../trivia.png';
import '../App.css';
import Login from '../components/Login';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      settings: false,
    };
  }

  render() {
    const { settings } = this.state;
    if (settings) return <Redirect to="/settings" />;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>VAMOS JOGAR!!</p>
        </header>
        <Login />
        <button
          data-testid="btn-settings"
          type="button"
          onClick={ () => this.setState({ settings: true }) }
        >
          Settings
        </button>
      </div>
    );
  }
}

export default Home;
