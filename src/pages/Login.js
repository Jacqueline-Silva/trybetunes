import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <div data-testid="page-login">
        <h2>Login</h2>

        <label htmlFor="nameInput">
          <input
            type="text"
            data-testid="login-name-input"
            name="nameInput"
          />
        </label>

        <button
          type="submit"
          data-testid="login-submit-button"
        >
          Entrar
        </button>

      </div>
    );
  }
}

export default Login;
