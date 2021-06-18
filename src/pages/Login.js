import React from 'react';
import PropTypes from 'prop-types';

import logo from '../trivia.png';
import '../App.css';

import Form from '../components/Form';
import SettingBtn from '../components/SettingBtn';

export default class Login extends React.Component {
  // componentDidMount() {
  //   localStorage.setItem('ranking', 'alo');
  // }

  render() {
    const { history } = this.props;
    return (
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <SettingBtn />
        <p>
          SUA VEZ
        </p>
        <Form history={ history } />
      </header>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
