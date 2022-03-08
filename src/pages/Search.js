import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
  render() {
    const { inputChange, nameArtist } = this.props;
    const min = 2;

    return (
      <div data-testid="page-search">
        <h3>Search</h3>
        <label htmlFor="searchArtist">
          <input
            name="nameArtist"
            data-testid="search-artist-input"
            onChange={ inputChange }
          />
        </label>
        <button
          type="submit"
          data-testid="search-artist-button"
          disabled={ nameArtist.length < min }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}
Search.propTypes = {
  nameArtist: PropTypes.string.isRequired,
  inputChange: PropTypes.func.isRequired,
  // handleClick: PropTypes.func.isRequired,
};

export default Search;
