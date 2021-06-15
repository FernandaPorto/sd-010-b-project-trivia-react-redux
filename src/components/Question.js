import React from 'react';

class Question extends React.Component {
  render() {
    const { number, results } = this.props;
    return (
      <div>
        { console.log(results[0]) }
      </div>
    );
  }
}

export default Question;
