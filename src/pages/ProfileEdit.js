import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { getUser, updateUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from './Loading';

class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      userProfile: {},
      redirect: false,
      iptName: '',
      iptEmail: '',
      iptDescription: '',
      iptImage: '',
    };

    this.removeValue = this.removeValue.bind(this);
    this.verifyDisabled = this.verifyDisabled.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.getUserProfile = this.getUserProfile.bind(this);
  }

  componentDidMount() {
    this.getUserProfile();
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  async getUserProfile() {
    this.setState({
      loading: true,
    });

    const responseUser = await getUser();

    this.setState({
      loading: false,
      userProfile: responseUser,
      iptName: responseUser.name,
      iptEmail: responseUser.email,
      iptDescription: responseUser.description,
      iptImage: responseUser.image,
    });
  }

  removeValue({ target }) {
    target.value = '';
  }

  async updateProfile() {
    const { iptName, iptEmail, iptDescription, iptImage } = this.state;

    this.setState({
      loading: true,
    });

    const profileAtt = {
      name: iptName,
      email: iptEmail,
      image: iptImage,
      description: iptDescription,
    };

    await updateUser(profileAtt);

    this.setState({
      loading: false,
      redirect: true,
    });
  }

  verifyDisabled() {
    const { iptName, iptEmail, iptDescription, iptImage } = this.state;
    if (iptName === '' || undefined) {
      return true;
    }
    if (iptEmail === '' || undefined) {
      return true;
    }
    if (iptDescription === '' || undefined) {
      return true;
    }
    if (iptImage === '' || undefined) {
      return true;
    }
  }

  render() {
    const {
      loading,
      userProfile,
      redirect,
      iptName,
      iptEmail,
      iptDescription,
      iptImage } = this.state;

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
                  <div key={ userProfile.name } className="dadosProfileEdit">
                    <img
                      src={ userProfile.image === '' ? 'https://flyclipart.com/thumb2/profile-icon-png-black-196391.png' : userProfile.image }
                      alt={ userProfile.name }
                      data-testid="profile-image"
                      width="180px"
                    />
                    <h4>Nome: </h4>
                    <p>
                      { userProfile.name }
                    </p>
                    <h4>Email: </h4>
                    <p>
                      { userProfile.email }
                    </p>
                    <h4>Descrição: </h4>
                    <p>
                      { userProfile.description }
                    </p>
                  </div>
                  <div className="profileEdit--forms">
                    <h3>Edite suas informações</h3>
                    <form className="dadosProfileEdit2">
                      <label htmlFor="iptName">
                        Nome:
                        <input
                          type="text"
                          name="iptName"
                          data-testid="edit-input-name"
                          value={ iptName }
                          onChange={ this.handleChange }
                          onClick={ this.removeValue }
                        />
                      </label>
                      <label htmlFor="iptEmail">
                        Email:
                        <input
                          type="email"
                          name="iptEmail"
                          data-testid="edit-input-email"
                          value={ iptEmail }
                          onChange={ this.handleChange }
                          onClick={ this.removeValue }
                        />
                      </label>
                      <label htmlFor="iptDescription">
                        Descrição:
                        <input
                          type="text"
                          name="iptDescription"
                          data-testid="edit-input-description"
                          value={ iptDescription }
                          onChange={ this.handleChange }
                          onClick={ this.removeValue }
                        />
                      </label>
                      <label htmlFor="iptImage">
                        Foto de perfil:
                        <input
                          type="text"
                          name="iptImage"
                          data-testid="edit-input-image"
                          value={ iptImage }
                          onChange={ this.handleChange }
                          onClick={ this.removeValue }
                        />
                      </label>

                      <button
                        type="button"
                        data-testid="edit-button-save"
                        disabled={ this.verifyDisabled() }
                        onClick={ this.updateProfile }
                      >
                        Salvar Alterações
                      </button>
                    </form>
                    {
                      redirect && <Redirect to="/profile" />
                    }
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
