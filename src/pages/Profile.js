import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      dadosProfile: {},
    };

    this.getProfile = this.getProfile.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  componentDidMount() {
    this.getProfile();
  }

  async getProfile() {
    this.setState({
      loading: true,
    });

    const dados = await getUser();

    this.setState({
      loading: false,
      dadosProfile: dados,
      redirectEdit: false,
    });
  }

  redirect() {
    this.setState({
      redirectEdit: true,
    });
  }

  render() {
    const { dadosProfile, loading, redirectEdit } = this.state;
    const { name, email, description, image } = dadosProfile;

    return (
      <div data-testid="page-profile">
        <Header />
        <div className="profile">
          <h3>Profile</h3>
          <div>
            {
              loading
                ? <Loading />
                : (
                  <div key={ name } className="dadosProfile">
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
                    <button
                      type="button"
                      onClick={ this.redirect }
                    >
                      Editar perfil
                    </button>
                    {
                      redirectEdit && <Redirect to="/profile/edit" />
                    }
                  </div>
                )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
