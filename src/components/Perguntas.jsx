import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import PerguntaCard from './PerguntaCard';

class Perguntas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      perguntaIndex: 0,
    };
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  nextQuestion() {
    this.setState((state) => ({ perguntaIndex: state.perguntaIndex + 1 }));
  }

  renderPerguntaCard() {
    const { perguntas } = this.props;
    if (perguntas) {
      const { perguntaIndex } = this.state;
      const dotFive = 0.5;
      const question = perguntas[perguntaIndex];
      const options = [...question.incorrect_answers, question.correct_answer]
        .sort(() => Math.random() - dotFive);
        
      return (
        <div>
          <PerguntaCard
            question={ question }
            options={ options }
            nextQuestion={ this.nextQuestion }
          />
        </div>
      );
    }
    return <p>Loading...</p>;
  }

  render() {
    const { perguntaIndex } = this.state;
    const four = 4;
    if (perguntaIndex > four) {
      return <Redirect to="/feedback" />;
    }
    return (
      <>
        { this.renderPerguntaCard() }
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  perguntas: state.perguntas.perguntas.results,
});
Perguntas.propTypes = PropTypes.shape({
  perguntas: PropTypes.instanceOf(Array),
  pedePerguntas: PropTypes.func,
}).isRequired;

export default connect(mapStateToProps)(Perguntas);
