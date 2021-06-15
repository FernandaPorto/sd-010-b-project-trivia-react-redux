import React, { Component } from 'react';
import Header from '../components/Header';
import Perguntas from '../components/Perguntas';
import { connect } from 'react-redux'
import fetchPerguntas from '../redux/actions/perguntasThunk'
import * as fetToken from './Api';

class Game extends Component {
  componentDidMount() {
    const { pedePerguntas } = this.props
    fetToken.getToken().then((response) => {
      localStorage.setItem('token', `${response.token}`)
       pedePerguntas(response.token);
    })}

  render() {
    return (
      <div>
        <Header />
        <Perguntas />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
 pedePerguntas: (token) => dispatch(fetchPerguntas(token))
})
 
export default connect(null, mapDispatchToProps)(Game);
