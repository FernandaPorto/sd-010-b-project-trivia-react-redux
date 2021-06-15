import React, { Component } from 'react';
import { connect } from 'react-redux';

class Perguntas extends Component {
  render() {
    // teste() {
      
    // }


    const { perguntas, id } = this.props;
      if (perguntas) {
      const { question, correct_answer, incorrect_answers } = perguntas[id];
      console.log(perguntas[id]);
      return (
        <div>
          <p>{question}</p>
          <p>{correct_answer}</p>
          <p>{incorrect_answers[0]}</p>
          <p>{incorrect_answers[1]}</p>
          <p>{incorrect_answers[2]}</p>
          {/* <button onClick={this.teste}>Proxima pergunta</button> */}
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
