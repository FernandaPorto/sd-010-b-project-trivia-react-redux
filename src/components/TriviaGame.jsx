import './TriviaGame.css';

import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import {
  answerQuestionActionCreator,
  getQuestionsThunk,
  nextQuestionActionCreator,
  updateSecondsActionCreator,
  updateScoreThunk,
} from '../redux/actions';

import Timer from './Timer';

class TriviaGame extends React.Component {
  constructor(props) {
    super(props);

    this.renderQuestion = this.renderQuestion.bind(this);
    this.renderNextButton = this.renderNextButton.bind(this);

    this.state = {
      redirect: false,
    };
  }

  componentDidMount() {
    const { getQuestions } = this.props;
    getQuestions();
  }

  componentWillUnmount() {
    const { gravatarURL, name, score } = this.props;
    const newRanking = {
      gravatarURL,
      name,
      score,
    };
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    ranking.push(newRanking);
    localStorage.setItem('ranking', JSON.stringify(ranking));
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
            <button
              type="button"
              key={ index }
              onClick={ () => {
                answerQuestion();
                if (isCorrect) updateScore({ secondsLeft, difficulty });
              } }
              className={ isResolved ? coloredStyle : 'default-button' }
              disabled={ isResolved }
            >
              {answer}
            </button>
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
    const { isLoading, isResolved } = this.props;

    if (redirect) return <Redirect to="/feedback" />;
    if (isLoading) return <h2>Loading...</h2>;

    return (
      <section>
        <div>{this.renderQuestion()}</div>
        <div>{isResolved ? this.renderNextButton() : <Timer />}</div>
      </section>
    );
  }
}

const mapStateToProps = ({ game, player }) => ({
  gravatarURL: player.gravatarURL,
  isLoading: game.isLoading,
  isResolved: game.isResolved,
  name: player.name,
  questions: game.questions,
  questionIndex: game.questionIndex,
  score: player.score,
  secondsLeft: game.secondsLeft,
});

const mapDispatchToProps = (dispatch) => ({
  answerQuestion: () => dispatch(answerQuestionActionCreator()),
  getQuestions: () => dispatch(getQuestionsThunk()),
  nextQuestion: (payload) => dispatch(nextQuestionActionCreator(payload)),
  updateScore: (payload) => dispatch(updateScoreThunk(payload)),
  updateSeconds: (payload) => dispatch(updateSecondsActionCreator(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TriviaGame);
