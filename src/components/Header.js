import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
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

  render() {
    const { name } = this.props;
    const { photo } = this.state;
    console.log(`resposta aqui ${photo}`);
    return (
      <header>
        <img src={ `https://www.gravatar.com/avatar/${photo}` } data-testid="header-profile-picture" alt="my profile" width="50px" />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">0</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  name: state.user.name,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
