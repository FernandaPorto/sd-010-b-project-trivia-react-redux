import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Questionaire from './Questionaire';

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.getQuestions = this.getQuestions.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);

    this.state = {
      questions: [],
      currentIndex: 0,
    };
  }

  componentDidMount() {
    this.getQuestions();
  }

  async getQuestions() {
    const { tok } = this.props;
    const apiQuestion = (`https://opentdb.com/api.php?amount=5&token=${tok}`);
    const response = await fetch(apiQuestion);
    const data = await response.json();

    this.setState({
      questions: data.results,
    });
  }

  handleAnswer(answer) {
    const { currentIndex } = this.state;
    this.setState({
      currentIndex: currentIndex + 1,
    });
    // conferir a resposta

    // mostrar outra pergunta

    // mudar placar se correto
  }

  render() {
    const { questions, currentIndex } = this.state;
    console.log(questions);
    return (
      questions.length > 0 ? (
        <div className="container">
          <Questionaire
            data={ questions[currentIndex] }
            handleAnswer={ this.handleAnswer }
          />
          {/* <p
            data-testid="question-category"
          >
            { questions[0].category }
          </p>
          <h2
            data-testid="question-text"
            dangerouslySetInnerHTML={ { __html: questions[0].question } }
          />
          <div>
            <div>
              <button
                type="button"
                data-testid="correct-answer"
              >
                {questions[0].correct_answer}
              </button>
              {questions[0].incorrect_answers.map(
                (elem, index) => (
                  <button
                    type="button"
                    data-testid={ `wrong-answer-${index}` }
                    key={ index }
                  >
                    { elem }
                  </button>
                ),
              )}
            </div>

          </div> */}
        </div>) : (<h2>Loading...</h2>)
    );
  }
}

const mapStateToProps = (state) => ({
  tok: state.api.token,
});

Question.propTypes = {
  tok: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Question);
