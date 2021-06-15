import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import fetchPerguntas from '../redux/actions/perguntasThunk';
import PerguntaCard from './PerguntaCard';

class Perguntas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      perguntaIndex: 0,
    };
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    const { pedePerguntas } = this.props;
    pedePerguntas(localStorage.getItem('token'));
  }

  nextQuestion() {
    this.setState((state) => ({ perguntaIndex: state.perguntaIndex + 1 }));
  }

  render() {
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
}

const mapDispatchToProps = (dispatch) => ({
  pedePerguntas: (token) => dispatch(fetchPerguntas(token)),
});

const mapStateToProps = (state) => ({
  perguntas: state.perguntas.perguntas.results,
});
Perguntas.propTypes = PropTypes.shape({
  perguntas: PropTypes.instanceOf(Array),
  pedePerguntas: PropTypes.func,
}).isRequired;
export default connect(mapStateToProps, mapDispatchToProps)(Perguntas);
