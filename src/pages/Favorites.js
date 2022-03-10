import React, { Component } from 'react';
import Header from '../components/Header';

class Favorites extends Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <Header />
        <div className="favorite">
          <h3>Favorites</h3>
        </div>
      </div>
    );
  }
}

export default Favorites;
