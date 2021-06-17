import React from 'react';
import Header from '../components/Header';

class Ranking extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <div>
        <Header />
        <section data-testid="ranking-title">Ranking</section>
      </div>
    );
  }
}

export default Ranking;
