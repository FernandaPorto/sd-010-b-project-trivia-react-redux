import React from 'react';

class StartButton extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.handleClick = this.handleClick.bind(this);
  // }

  async handleClick() {
    const { token } = await (await fetch('https://opentdb.com/api_token.php?command=request')).json();
    console.log(token);
  }

  render() {
    return (
      <button
        type="button"
        onClick={ this.handleClick }
      >
        Jogar
      </button>
    );
  }
}

export default StartButton;
