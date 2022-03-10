import React, { Component } from 'react';
import Header from '../components/Header';

class ProfileEdit extends Component {
  render() {
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <div className="profileEdit">
          <h3>ProfileEdit</h3>
        </div>
      </div>
    );
  }
}

export default ProfileEdit;
