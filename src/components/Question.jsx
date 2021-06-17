/* eslint-disable react/no-danger */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.getQuestions = this.getQuestions.bind(this);

    this.state = {
      questions: [],
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

    /* const testeJ = [1, 2, 3, 4, 5, 6];
    function testeAleatorio(arrayTeste) {
      const arr = arrayTeste.slice();
      for (let index = 0; index < data.results.length; index += 1) {
        const index2 = Math.floor(Math.random() * (index + 1));
        [arr[index], arr[index2]] = [arr[index2], arr[index]];
      }
      return arr;
    } */

    this.setState({
      questions: data.results,
    });
  }

  render() {
    const { questions } = this.state;
    return (
      questions.length > 0 ? (
<<<<<<< HEAD
        <div className="container">
          <div data-testid="question-category">
            {questions[0].category}
          </div>
          <div data-testid="question-text">
            {questions[0].question.replaceAll('&quot;', '"').replaceAll('&#039;', '\'')}
          </div>
          <div>
            <button type="button" data-testid="correct-answer">
              {questions[0].correct_answer}
            </button>
            <button type="button" data-testid={ `wrong-answer-${0}` }>
              {questions[0].incorrect_answers[0]}
            </button>
            <button type="button" data-testid={ `wrong-answer-${1}` }>
              {questions[0].incorrect_answers[1]}
            </button>
            <button type="button" data-testid={ `wrong-answer-${2}` }>
              {questions[0].incorrect_answers[2]}
            </button>

          </div>

        </div>
      ) : (
        <h1>Loading...</h1>
      )
    );
  }
}
export default Question;
=======
        <div>
          <p
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

          </div>
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
>>>>>>> bac4ae076cddf675b2c2b101a0b67e754c74b018
