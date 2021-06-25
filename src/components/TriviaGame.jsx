import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import Timer from './Timer';
import {
  answerQuestionActionCreator,
  nextQuestionActionCreator,
  updateSecondsActionCreator,
  updateScoreThunk,
} from '../redux/actions';
import './TriviaGame.css';

class TriviaGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
    };
  }

  renderQuestion() {
    const {
      isResolved,
      questionIndex,
      questions,
      secondsLeft,
      answerQuestion,
      updateScore,
    } = this.props;

    const {
      answerOptions,
      category,
      correctAnswer,
      difficulty,
      question,
    } = questions[questionIndex];

    return (
      <div>
        <h2>{category}</h2>
        <h3>{question}</h3>
        {answerOptions.map((answer, index) => {
          const isCorrect = answer === correctAnswer;
          const coloredStyle = isCorrect ? 'green-border' : 'red-border';

          return (
            <div key={ index }>
              <input
                type="button"
                className={ isResolved ? coloredStyle : 'default-button' }
                value={ answer }
                onClick={ () => {
                  answerQuestion();
                  if (isCorrect) updateScore({ secondsLeft, difficulty });
                } }
                disabled={ isResolved }
              />
            </div>
          );
        })}
      </div>
    );
  }

  renderNextButton() {
    const { questionIndex, questions, nextQuestion } = this.props;

    const isLast = questionIndex === questions.length - 1;
    let nextIndex = questionIndex + 1;
    if (isLast) nextIndex = 0;

    return (
      <button
        type="button"
        onClick={ () => {
          nextQuestion({ nextIndex });
          if (isLast) this.setState({ redirect: true });
        } }
      >
        Próxima pergunta
      </button>
    );
  }

  render() {
    const { redirect } = this.state;
    const { isResolved } = this.props;

    if (redirect) return <Redirect to="/feedback" />;

    return (
      <section>
        {this.renderQuestion()}
        <div>{isResolved ? this.renderNextButton() : <Timer />}</div>
      </section>
    );
  }
}

const mapStateToProps = ({ game }) => ({
  isResolved: game.isResolved,
  questions: game.questions,
  questionIndex: game.questionIndex,
  secondsLeft: game.secondsLeft,
});

const mapDispatchToProps = (dispatch) => ({
  answerQuestion: () => dispatch(answerQuestionActionCreator()),
  nextQuestion: (payload) => dispatch(nextQuestionActionCreator(payload)),
  updateScore: (payload) => dispatch(updateScoreThunk(payload)),
  updateSeconds: (payload) => dispatch(updateSecondsActionCreator(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TriviaGame);
