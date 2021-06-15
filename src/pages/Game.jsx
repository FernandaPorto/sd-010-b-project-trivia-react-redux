import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Perguntas from '../components/Perguntas';
import fetchPerguntas from '../redux/actions/perguntasThunk';
// import * as fetToken from './Api';

class Game extends Component {
  componentDidMount() {
    const { pedePerguntas } = this.props;
    const token = localStorage.getItem('token');
    console.log(token);
    pedePerguntas(token);
  }

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
  pedePerguntas: (token) => dispatch(fetchPerguntas(token)),
});

export default connect(null, mapDispatchToProps)(Game);
