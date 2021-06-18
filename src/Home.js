import React, { Component } from 'react';
import logo from './trivia.png';
import Login from './pages/Login';
import './App.css';

class Home extends Component {
  render() {
    return (
      <div>
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <img src="./login.svg" className="login-logo" alt="logo" />
        </header>
        <Login />
      </div>
    );
  }
}

export default Home;
