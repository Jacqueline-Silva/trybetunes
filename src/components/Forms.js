import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../pages/Loading';
import { updateUser } from '../services/userAPI';

class Forms extends Component {
  constructor() {
    super();

    this.state = {
      iptName: '',
      iptEmail: '',
      iptDescription: '',
      iptImage: '',
      redirect: false,
      loading: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.verifyDisabled = this.verifyDisabled.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
    console.log(this.state);
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
    const { redirect, loading } = this.state;

    return (
      <div>
        <h3>Edite suas informações</h3>
        {
          loading && <Loading />
        }
        <form className="dadosProfileEdit2">
          <label htmlFor="iptName">
            Nome:
            <input
              type="text"
              name="iptName"
              data-testid="edit-input-name"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="iptEmail">
            Email:
            <input
              type="email"
              name="iptEmail"
              data-testid="edit-input-email"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="iptDescription">
            Descrição:
            <input
              type="text"
              name="iptDescription"
              data-testid="edit-input-description"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="iptImage">
            Foto de perfil:
            <input
              type="text"
              name="iptImage"
              data-testid="edit-input-image"
              onChange={ this.handleChange }
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
          {
            !loading && redirect && <Redirect to="/profile" />
          }
        </form>
      </div>
    );
  }
}

export default Forms;
