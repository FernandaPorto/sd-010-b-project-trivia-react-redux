import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

class Navegation extends React.Component {
  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">Trivia Game</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/settings">Setting</Nav.Link>
              <Nav.Link href="/ranking">Ranking</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <br />
      </>

    );
  }
}

export default Navegation;
