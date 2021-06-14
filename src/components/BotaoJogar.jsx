import React from 'react';

class BotaoJogar extends React.Component {
  constructor() {
    super();
    this.requisitarAPI = this.requisitarAPI.bind(this);
  }

  async requisitarAPI() {
    const { token } = await fetch('https://opentdb.com/api_token.php?command=request').then((resp) => resp.json());
    localStorage.setItem('token', token);
  }

  render() {
    return (
      <button type="button" onClick={ () => this.requisitarAPI() }>Jogar</button>
    );
  }
}

export default BotaoJogar;
