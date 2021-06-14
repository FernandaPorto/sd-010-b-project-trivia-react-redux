import React, { Component } from 'react'

export class Feedback extends Component {
    render() {
        const { gravatar, playerName, score } = this.props;
        return (
            <div>
                <img data-testid="header-profile-picture" src={ gravatar } />
                <h2 data-testid="header-player-name">{ playerName }</h2>
                <h3 data-testid="header-score">{ score }</h3>
            </div>
        )
    }
}

export default Feedback;
