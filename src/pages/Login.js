import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

class Login extends Component {
  render() {
    const min = 3;
    const { inputChange, nameInput, handleClick, redirect } = this.props;

    return (
      <div data-testid="page-login">
        <h2>Login</h2>

        <label htmlFor="nameInput">
          <input
            type="text"
            data-testid="login-name-input"
            name="nameInput"
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
