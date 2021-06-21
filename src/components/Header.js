import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import '../style/header.css';
import md5 from 'crypto-js/md5';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = '';
  }

  render() {
    const { name, email, pontos } = this.props;
    // console.log(name);
    const gravatar = `https://www.gravatar.com/avatar/${md5(email).toString()}`;
    return (
      <header>

        <h1 data-testid="header-player-name">{name}</h1>
        <Container>
          <Row>
            <Col xs={ 6 } md={ 4 }>
              <Image data-testid="header-profile-picture" src={ gravatar } rounded />
            </Col>
          </Row>
        </Container>
        <div className="score">
          <h3>Placar</h3>
          <span data-testid="header-score">{pontos}</span>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  pontos: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.reducerName.name,
  email: state.reducerName.email,
  pontos: state.reducerName.score,
});

export default connect(mapStateToProps)(Header);
