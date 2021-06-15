import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class HeaderFeedback extends React.Component {

  convert() {
    const { email } = this.props;
    const converted = md5(email).toString();
    return `https://www.gravatar.com/avatar/${converted}`;
  }

  render() {
    return (
      null
    );
  }
}

HeaderFeedback.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  name: state.user.name,
});

export default connect(mapStateToProps)(HeaderFeedback);
