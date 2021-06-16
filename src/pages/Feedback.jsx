import React, { Component } from 'react';
import { connect } from 'react-redux';

class Feedback extends Component {
  render() {
    const {score, assertions } = this.props
    return (
      <section>
      <h2 data-testid="feedback-text">
        Mensagem de Feedback
      </h2>
      <p>Você acertou {assertions} questões!</p>
      <p>Um total de {score} pontos</p>
        {console.log(assertions)}
        {console.log(score)}
        <button>VER RANKING</button>
        <button>JOGAR NOVAMENTE</button>


      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.score.total,
  assertions: state.assertions.total,
});

export default connect(mapStateToProps)(Feedback)
