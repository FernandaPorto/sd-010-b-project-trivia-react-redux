import React from 'react';

import logo from '../trivia.png';
import '../App.css';

import Form from '../components/Form';
import Setting from '../components/Setting';

export default class Login extends React.Component {
  render() {
    return (
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <Setting />
        <p>
          SUA VEZ
        </p>
        <Form />
      </header>
    );
  }
}
