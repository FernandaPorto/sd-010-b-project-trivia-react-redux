import React, { Component } from 'react';
import { connect } from 'react-redux';

class Perguntas extends Component {
  render() {
    const { perguntas } = this.props;
    if (perguntas) {
      const { question, correct_answer, incorrect_answers } = perguntas[0];
      console.log(perguntas[0]);
      return (
        <div>
          <p>{question}</p>
          <p>{correct_answer}</p>
          <p>{incorrect_answers[0]}</p>
          <p>{incorrect_answers[1]}</p>
          <p>{incorrect_answers[2]}</p>
        </div>
      );
    }
    return <p>Loading</p>;
  }
}

const mapDispatchToProps = () => ({
  // pedePerguntas: (token) => dispatch(fetchPerguntas(token)),
});

const mapStateToProps = (state) => ({
  perguntas: state.perguntas.perguntas.results,
});

export default connect(mapStateToProps, mapDispatchToProps)(Perguntas);
