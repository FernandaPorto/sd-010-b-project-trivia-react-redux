import React, { Component } from 'react';
import { Transition, animated, config } from 'react-spring';

const devTeam = [
  {
    name: 'Lucas Rodrigues',
    picture: 'picture',
    github: 'github',
    linkedin: 'linkedin',
    delay: 200,
  },
  {
    name: 'Leandro Reis',
    picture: 'picture',
    github: 'github',
    linkedin: 'linkedin',
    delay: 400,
  },
  {
    name: 'Jonathan',
    picture: 'picture',
    github: 'github',
    linkedin: 'linkedin',
    delay: 600,
  },
  {
    name: 'Maximiliano',
    picture: 'picture',
    github: 'github',
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
            <animated.div style={ styles }>

              <section>
                <div>{item.name}</div>
                <div>{item.github}</div>
                <div>{item.linkedin}</div>
              </section>

            </animated.div>)}
        </Transition>

      </section>
    );
  }
}

export default About;
