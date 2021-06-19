import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { FiSettings } from 'react-icons/fi';
import { Transition, animated, config } from 'react-spring';
import LoginForms from '../components/LoginForms';
import '../login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      redirectSettings: false,
      showComp: false,
    };
  }

  componentDidMount() {
    this.showComp();
  }

  componentWillUnmount() {
    this.showComp();
  }

  showComp() {
    const { showComp } = this.state;
    this.setState({ showComp: !showComp });
  }

  render() {
    const { redirectSettings, showComp } = this.state;
    if (redirectSettings) {
      return <Redirect to="/settings" />;
    }
    return (
      <section className="login">

        <Transition
          items={ showComp }
          from={ { x: 500, opacity: 0 } }
          enter={ { x: 0, opacity: 1 } }
          leave={ { x: -500, opacity: 0 } }
          delay={ 200 }
          config={ config.molasses }
        >
          {(styles, item) => item
          && (
            <animated.div style={ styles }>
              <section className="login-container">
                <LoginForms />
                <button
                  type="button"
                  data-testid="btn-settings"
                  className="settings-btn"
                  onClick={ () => this.setState({ redirectSettings: true }) }
                >

                  <FiSettings />
                </button>
              </section>
            </animated.div>)}
        </Transition>

      </section>

    );
  }
}

export default Login;
