import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { enableDisable, setQuestionIndex,
  setRedirect, setStyle, timerRestart } from '../actions/controls';

class ButtonNextQuestion extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick() {
    // const { indice } = this.state;
    const {
      controls: { questionIndex, numberOfQuestions },
      questionIndexUpdate, redirectUpdate,
      restartTimer, toggleEnable, setAnswersProperties, styleUpdate } = this.props;
    styleUpdate({
      rightStyle: '',
      wrongStyle: '',
    });
    toggleEnable(false);
    restartTimer();
    if (questionIndex + 1 === numberOfQuestions) {
      questionIndexUpdate(0);
      return redirectUpdate(true);
    }
    // this.clearStyles();
    // Foi necessário usar async/await aqui, pois, ao usar Redux com thunk, este altera o comportamento síncrono para assíncrono. Então, causa um atraso na execução e, consequentemente, provoca um bug na aplicação.
    await questionIndexUpdate(questionIndex + 1);
    setAnswersProperties();
  }

  render() {
    const { controls: { disable, numberOfQuestions, questionIndex, timer } } = this.props;
    const btnText = questionIndex + 1 >= numberOfQuestions
      ? 'Resultado' : 'Próxima pergunta';
    if (disable || !timer) {
      return (
        <button
          type="button"
          // disabled={ !disable }
          onClick={ this.handleClick }
          data-testid="btn-next"
        >
          {btnText}
        </button>
      );
    }
    return null;
  }
}

ButtonNextQuestion.propTypes = {
  controls: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number,
    ]),
  ).isRequired,
  restartTimer: PropTypes.func.isRequired,
  toggleEnable: PropTypes.func.isRequired,
  questionIndexUpdate: PropTypes.func.isRequired,
  redirectUpdate: PropTypes.func.isRequired,
  setAnswersProperties: PropTypes.func.isRequired,
  styleUpdate: PropTypes.func.isRequired,
};

const mapStateToProps = ({ controls }) => ({
  controls,
});

const mapDispatchToProps = (dispatch) => ({
  restartTimer: () => dispatch(timerRestart()),
  toggleEnable: (value) => dispatch(enableDisable(value)),
  questionIndexUpdate: (value) => dispatch(setQuestionIndex(value)),
  redirectUpdate: (value) => dispatch(setRedirect(value)),
  styleUpdate: (value) => dispatch(setStyle(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonNextQuestion);
