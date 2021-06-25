import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      currentQuestionId: 0,
    };
  }

  renderAnswers() {
    const { questions } = this.props;
    const { currentQuestionId } = this.state;

    if (questions[currentQuestionId]) {
      const answers = [];
      
      questions[currentQuestionId].incorrect_answers.forEach((answer, index) => {
        let answerItem = [];
        answerItem.push(answer);
        answerItem.push(`wrong-answer-${index}`);
        answers.push(answerItem);
      });
      const correctAnswer = [];
      correctAnswer.push(questions[currentQuestionId].correct_answer);
      correctAnswer.push('correct-answer');
      answers.push(correctAnswer);
    
      console.log(answers);

      return (
        <>
          { answers.map((answer, index) => (
            <button key={ index } data-testid={ answer[1] }> { answer[0] } </button>
          )) }
        </>
      );
  }
          
  }
  render() {
    const { name, email, score } = this.props;
    const { questions } = this.props;
    const { currentQuestionId } = this.state;
    return (
      <>
        <header
          data-testid="header-profile-picture"
        >
          <img
            data-testid="header-profile-picture"
            src={`https://www.gravatar.com/avatar/${md5(email).toString()}`}
            alt={`image user ${ email }`}
          />
          <span data-testid="header-player-name">{ name }</span>
          <span data-testid="header-score">{ score }</span>
        </header>
        <main>
          <h1>Game!!!</h1>
          <span data-testid="question-category" >{questions[currentQuestionId]?.category}</span>
          <span data-testid="question-text">{ questions[currentQuestionId]?.question }</span>
          <div>{ this.renderAnswers() }</div>
        </main>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.email,
  score: state.player.score,
  questions: state.questions,
});
export default connect(mapStateToProps)(Game);
// export default Game;
