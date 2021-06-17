import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import action from '../actions';
import Timer from './Timer';
import '../App.css';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      questions: [],
      answered: false,
    };

    this.nextQuestion = this.nextQuestion.bind(this);
    this.rodaroda = this.rodaroda.bind(this);
    this.answeredQuestion = this.answeredQuestion.bind(this);
    this.nextButton = this.nextButton.bind(this);
  }

  rodaroda() {
    // const { APIquestions } = this.props;
    const local = localStorage.getItem('token');
    const urlQuiz = `https://opentdb.com/api.php?amount=5&token=${local}`;
    fetch(urlQuiz)
      .then((response) => (
        response
          .json()
          .then((json) => this.setState({
            questions: json.results,
          }))
          .catch((error) => error)
      ));
  }

  // componentDidMount() {
  //   // const { APIquestions } = this.props;
  //   const local = localStorage.getItem('token');
  //   // APIquestions(local);
  //   const urlQuiz = `https://opentdb.com/api.php?amount=5&token=${local}`;
  //   fetch(urlQuiz)
  //     .then((response) => (
  //       response
  //         .json()
  //         .then((json) => this.setState({
  //           questions: json.results,
  //         }))
  //         .catch((error) => error)
  //     ));
  // }

  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  shuffle(array) {
    let currentIndex = array.length; let
      randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  questionStructure() {
    const { questions, id } = this.state;
    return (
      <>
        <h6 data-testid="question-category">{questions[id].category}</h6>
        <div data-testid="question-text">{questions[id].question}</div>
      </>
    );
  }

  nextQuestion() {
    const { id } = this.state;
    const { time } = this.props;
    this.setState({
      id: id + 1,
      answered: false,
    });
    time({ type: 'RESET' });
  }

  answeredQuestion() {
    const { time } = this.props;
    time({ type: 'HIDE' });
    this.setState({
      answered: true,
    });
  }

  nextButton() {
    const { answered } = this.state;
    return (
      <button
        data-testid="btn-next"
        type="button"
        onClick={ this.nextQuestion }
        style={ { visibility: (answered ? 'visible' : 'hidden') } }
      >
        Próxima
      </button>
    );
  }

  redirector(identifier) {
    const { questions } = this.state;
    if (identifier > (questions.length) - 1) {
      return <Redirect to="/" />;
    }
  }

  render() {
    const { questions, id, answered } = this.state;
    const { timeout } = this.props;
    if (timeout === true && answered === false) { this.answeredQuestion(); }
    if (questions.length === 0) {
      this.rodaroda();
      return <h1>Loading...</h1>;
    }
    if (id > (questions.length) - 1) { return <Redirect to="/feedback" />; }
    const answers = [questions[id].correct_answer, ...questions[id].incorrect_answers];
    const shuffleAnswers = this.shuffle(answers);
    let index = null;
    return (
      <div>
        {this.questionStructure()}
        {shuffleAnswers.map((item, i) => {
          if (item !== questions[id].correct_answer) {
            index += 1;
            return (
              <button
                disabled={ answered }
                type="button"
                key={ i }
                data-testid={ `wrong-answer-${index - 1}` }
                className={ answered ? 'red-border' : '' }
                onClick={ this.answeredQuestion }
              >
                {item}
              </button>
            );
          }
          return (
            <button
              disabled={ answered }
              type="button"
              key="correct"
              data-testid="correct-answer"
              className={ answered ? 'green-border' : '' }
              onClick={ this.answeredQuestion }
            >
              {item}
            </button>
          );
        })}
        { this.nextButton() }
        <Timer />
      </div>
    );
  }
}

const MapStateToProps = (state) => ({
  tokenKey: state.token.key,
  show: state.timeout.show,
  timeout: state.timeout.timeout,
});

const mapDispatchToProps = (dispatch) => ({
  time: (state) => dispatch(action(state)),
});

Quiz.propTypes = {
  time: PropTypes.func.isRequired,
  timeout: PropTypes.bool.isRequired,
};

export default connect(MapStateToProps, mapDispatchToProps)(Quiz);
