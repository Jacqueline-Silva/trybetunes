import React, { Component } from 'react';
import Forms from '../components/Forms';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      userProfile: {},
    };

    this.getUserProfile = this.getUserProfile.bind(this);
  }

  componentDidMount() {
    this.getUserProfile();
  }

  async getUserProfile() {
    this.setState({
      loading: true,
    });

    const responseUser = await getUser();
    console.log(responseUser);

    this.setState({
      loading: false,
      userProfile: responseUser,
    });
  }

  render() {
    const { loading, userProfile } = this.state;
    const { name, email, description, image } = userProfile;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        <div className="profileEdit">
          <h3>ProfileEdit</h3>
          {
            loading
              ? <Loading />
              : (
                <div className="profileEdit--info-forms">
                  <div key={ name } className="dadosProfileEdit">
                    <img
                      src={ image === '' ? 'https://flyclipart.com/thumb2/profile-icon-png-black-196391.png' : image }
                      alt={ name }
                      data-testid="profile-image"
                      width="180px"
                    />
                    <h4>Nome: </h4>
                    <p>
                      { name }
                    </p>
                    <h4>Email: </h4>
                    <p>
                      { email }
                    </p>
                    <h4>Descrição: </h4>
                    <p>
                      { description }
                    </p>
                  </div>
                  <div className="profileEdit--forms">
                    <Forms />
                  </div>
                </div>
              )
          }
        </div>
      </div>
    );
  }
}

export default ProfileEdit;
