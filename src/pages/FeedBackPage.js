import React, { Component } from 'react';
import FeedBackHeader from '../components/FeedBackHeader';
import FeedBackMain from '../components/FeedBackMain';

export default class FeedBackPage extends Component {
  render() {
    return (
      <main>
        <FeedBackHeader />
        <FeedBackMain />
      </main>
    );
  }
}
