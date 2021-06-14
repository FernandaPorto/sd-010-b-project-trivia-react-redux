import React from 'react';
// import PropTypes from 'prop-types';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      name: '',
      email: '',
    };
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { name, email } = this.state;
    return (
      <div>
        <input
          type="text"
          data-testid="input-player-name"
          name="name"
          placeholder=""
          onChange={ this.handleChange }
        />
        <input
          type="email"
          data-testid="input-gravatar-email"
          name="email"
          placeholder=""
          onChange={ this.handleChange }
        />
        <input
          type="button"
          value="Jogar"
          disabled={ !(name && email) }
          data-testid="btn-play"
        />
      </div>
    );
  }
}

export default Login;
