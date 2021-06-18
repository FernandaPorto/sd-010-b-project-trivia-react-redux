import React from 'react';
import { Link } from 'react-router-dom';
import { setToken } from '../pages/GamePage';

class ButtonNextQuestion extends React.Component {

  async getSetToken() {
    const awaitSetToken = await setToken();
    return awaitSetToken;
  }

  render() {
    return (
      <Link to="/gamepage">
        <button type="button" onClick={ () => getSetToken() }>
          Próxima pergunta
        </button>
      </Link>
    );
  }
}

export default ButtonNextQuestion;
