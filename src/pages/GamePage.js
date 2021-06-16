import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class GamePage extends React.Component {
  // componentDidMount() {
  //   const { sendTokenToLocal } = this.props;
  //   console.log(sendTokenToLocal);
  // }

  render() {
    return (
      <section>
        <h1>Trivia</h1>
      </section>
    );
  }
}

GamePage.propTypes = {
  sendTokenToLocal: PropTypes.objectOf(PropTypes.arrayOf).isRequired,
};

const mapStateToProps = (state) => ({
  sendTokenToLocal: state.token,
});

export default connect(mapStateToProps)(GamePage);
