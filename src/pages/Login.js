import React from 'react';

import logo from '../trivia.png';
import '../App.css';

import Form from '../components/Form';
import SettingBtn from '../components/SettingBtn';

export default class Login extends React.Component {
  render() {
    return (
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <SettingBtn />
        <p>
          SUA VEZ
        </p>
        <Form />
      </header>
    );
  }
}
