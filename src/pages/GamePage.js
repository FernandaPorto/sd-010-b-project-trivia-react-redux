import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router';
// import PropTypes from 'prop-types';
// import { fetchToken } from '../actions/index';

class GamePage extends Component {
  render() {
    // const { questions } = this.props;

    return (
      <>
        <div>
          {/* <h3 data-testid="question-category">{ questions }</h3> */}
          <div>Question</div>
        </div>
        <div>
          { questions.map() }
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.triviaGame.questions,
});

export default connect(mapStateToProps, null)(GamePage);
