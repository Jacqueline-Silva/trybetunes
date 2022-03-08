import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { nameInput } = this.props;

    return (
      <header data-testid="header-component">
        <nav>
          <NavLink to="/search" activeClassName="active"> Search </NavLink>
          <NavLink to="/album/:id" activeClassName="active"> Album </NavLink>
          <NavLink to="/favorites" activeClassName="active"> Favorites </NavLink>
          <NavLink to="/profile" activeClassName="active" exact> Profile </NavLink>
          <NavLink to="/profile/edit" activeClassName="active"> Profile Edit </NavLink>
        </nav>
        <div data-testid="header-user-name">
          { nameInput }
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  nameInput: PropTypes.string.isRequired,
};

export default Header;
