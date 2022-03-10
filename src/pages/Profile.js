import React, { Component } from 'react';
import Header from '../components/Header';

class Profile extends Component {
  render() {
    return (
      <div data-testid="page-profile">
        <Header />
        <div className="profile">
          <h3>Profile</h3>
        </div>
      </div>
    );
  }
}

export default Profile;
