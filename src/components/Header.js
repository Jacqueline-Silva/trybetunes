import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      nameInput: '',
    };

    this.handleProfile = this.handleProfile.bind(this);
  }

  componentDidMount() {
    this.handleProfile();
  }

  async handleProfile() {
    this.setState({
      loading: true,
    });
    const result = await getUser();
    this.setState({
      nameInput: result.name,
      loading: false,
    });
  }

  render() {
    const { nameInput, loading } = this.state;

    return (
      <header data-testid="header-component">
        <div
          data-testid="header-user-name"
          className="title-profile"
        >
          <h1>
            <Link to="/" exact className="link-header"> TrybeTunes </Link>
          </h1>
          <h3>
            {
              loading ? <Loading /> : nameInput
            }
          </h3>
        </div>
        <nav>
          <NavLink
            to="/search"
            data-testid="link-to-search"
            activeClassName="active"
          >
            Search
          </NavLink>

          <NavLink to="/album/:id"> </NavLink>

          <NavLink
            to="/favorites"
            data-testid="link-to-favorites"
            activeClassName="active"
          >
            Favorites
          </NavLink>

          <NavLink to="/profile/edit"> </NavLink>

          <NavLink
            to="/profile"
            data-testid="link-to-profile"
            activeClassName="active"
            exact
          >
            Profile
          </NavLink>
        </nav>
      </header>
    );
  }
}

export default Header;
