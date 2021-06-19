import React, { Component } from 'react';
import { Transition, animated, config } from 'react-spring';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';

import '../about.css';

const devTeam = [
  {
    name: 'Lucas Rodrigues',
    picture: 'https://avatars.githubusercontent.com/u/78750077?v=4',
    github: 'https://github.com/LucasRPontes',
    linkedin: 'linkedin',
    delay: 200,
  },
  {
    name: 'Leandro Reis',
    picture: 'https://avatars.githubusercontent.com/u/72284886?v=4',
    github: 'https://github.com/leandrofcr',
    linkedin: 'linkedin',
    delay: 400,
  },
  {
    name: 'Jonathan Souza',
    picture: 'https://avatars.githubusercontent.com/u/49069814?v=4',
    github: 'https://github.com/JSouza27',
    linkedin: 'linkedin',
    delay: 600,
  },
  {
    name: 'Maximiliano Alvarenga',
    picture: 'https://avatars.githubusercontent.com/u/84460365?v=4',
    github: 'https://github.com/maximilianoalvarenga',
    linkedin: 'linkedin',
    delay: 800,
  },
];

class About extends Component {
  render() {
    return (
      <section className="dev-team">
        <Transition
          items={ devTeam }
          from={ { x: 500, opacity: 0 } }
          enter={ (item) => (next) => (
            next({ x: 0, opacity: 1, delay: item.delay })
          ) }
          leave={ { x: -500, opacity: 0 } }
          delay={ 200 }
          config={ config.molasses }
        >
          {(styles, item) => item
          && (
            <animated.div style={ styles } className="dev-container">

              <img src={ item.picture } alt="Foto do desenvolvedor" />
              <span>{item.name}</span>
              <section className="social">
                <button type="button">
                  {' '}
                  <AiFillGithub />
                  {' '}
                </button>
                <button type="button">
                  {' '}
                  <AiFillLinkedin />
                  {' '}
                </button>
              </section>

            </animated.div>)}
        </Transition>

      </section>
    );
  }
}

export default About;
