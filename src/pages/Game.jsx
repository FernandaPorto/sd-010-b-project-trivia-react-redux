import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchApi from '../services/fetchApi';
import Question from '../components/Question';
import Header from '../components/Header';
import Timer from '../components/Timer';
import { setRedirect } from '../actions/controls';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    fetchApi().then((data) => this.updtadeQuestions(data));
  }

  componentWillUnmount() {
    const { redirectUpdate } = this.props;
    redirectUpdate(false);
  }

  updtadeQuestions({ results: questions }) {
    this.setState({ questions });
  }

  render() {
    const { questions } = this.state;
    const { controls: { disable, redirect, timer } } = this.props;
    return (
      <div>
        { redirect && <Redirect to="/feedback" /> }
        <Header />
        { !disable ? <Timer /> : <p>{ timer }</p> }
        {questions && <Question questions={ questions } />}
      </div>
    );
  }
}

Game.propTypes = {
  controls: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number,
    ]),
  ).isRequired,
  redirectUpdate: PropTypes.func.isRequired,
};

const mapStateToProps = ({ controls }) => ({
  controls,
});

const mapDispatchToProps = (dispatch) => ({
  redirectUpdate: (value) => dispatch(setRedirect(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
