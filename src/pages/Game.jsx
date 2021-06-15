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
    pedePerguntas(token);
  }

  render() {
    const { id } = this.props.match.params

    return (
      <div>

        <Header />
        <Perguntas id={ id } />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  pedePerguntas: (token) => dispatch(fetchPerguntas(token)),
});

export default connect(null, mapDispatchToProps)(Game);
