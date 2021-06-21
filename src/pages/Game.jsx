import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Question from '../components/Question';
import '../css/Game.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    };
  }

  componentDidMount() {
    this.requestTrivia();
  }

  requestTrivia() {
    const token = localStorage.getItem('token');
    return fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((response) => response.json())
      .then((data) => this.setState({ results: data.results }));
  }

  render() {
    const { results } = this.state;
    const { numQuestion } = this.props;
    return (
      <>
        <Header />
        {results.map(
          (result, index) => numQuestion === index && (
            <Question
              result={ result }
              key={ numQuestion }
            />
          ),
        )}
      </>
    );
  }
}

Game.propTypes = {
  numQuestion: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  numQuestion: state.game.numQuestion,
});

export default connect(mapStateToProps)(Game);
