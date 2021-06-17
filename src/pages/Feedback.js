import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.photoSearch = this.photoSearch.bind(this);
    this.state = {
      photo: '',
    };
  }

  componentDidMount() {
    this.photoSearch();
  }

  photoSearch() {
    const { email } = this.props;
    const hash = md5(email).toString();
    this.setState({ photo: hash });
  }

  renderMessage() {
    const getAssertions = JSON.parse(localStorage.getItem('state'));
    const { player: { assertions } } = getAssertions;
    const lowScore = 3;
    if (assertions < lowScore) {
      return (
        <div
          data-testid="feedback-text"
          className="low-score"
        >
          Podia ser melhor...
        </div>
      );
    }
    return (
      <div
        data-testid="feedback-text"
        className="high-score"
      >
        Mandou bem!
      </div>
    );
  }

  render() {
    const { name } = this.props;
    const { photo } = this.state;
    const getScore = JSON.parse(localStorage.getItem('state'));
    const { player: { score } } = getScore;
    return (
      <div className="feedback-div">
        <h1 className="feedback-title">Resultado</h1>
        <p
          data-testid="header-score"
          className="feedback-score"
        >
          { score }
        </p>
        <div className="feedback-main">
          <img
            src={ `https://www.gravatar.com/avatar/${photo}` }
            data-testid="header-profile-picture"
            alt="my profile"
          />
          <section className="feedback-data">
            <p data-testid="header-player-name">{ name }</p>
            { this.renderMessage() }
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  name: state.user.name,
});

Feedback.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Feedback);
