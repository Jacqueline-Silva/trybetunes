import React, { Component } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import PropTypes from 'prop-types';

class Login extends Component {
  render() {
    const { inputChange, nameInput, handleClick, redirect } = this.props;
    const min = 3;

    return (
      <div data-testid="page-login" className="login">
        <h2>Login</h2>
        <div className="login--input">
          <label htmlFor="nameInput">
            <input
              type="text"
              data-testid="login-name-input"
              name="nameInput"
              placeholder="Digite seu nome"
              onChange={ inputChange }
            />
          </label>

          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ nameInput.length < min }
            onClick={ handleClick }
          >
            Entrar
          </button>
          {
            redirect && <Redirect to="/search" />
          }
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  nameInput: PropTypes.string.isRequired,
  inputChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  redirect: PropTypes.bool.isRequired,
};

export default Login;
