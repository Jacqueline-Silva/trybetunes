import React, { Component } from 'react';
import CardsOfAlbum from '../components/CardsOfAlbum';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      nameArtist: '',
      loading: false,
      resultArtist: '',
      album: [],
    };

    this.handleClick = this.handleClick.bind(this);
    this.inputChange = this.inputChange.bind(this);
  }

  async handleClick() {
    const { nameArtist } = this.state;
    this.setState({
      loading: true,
    });

    const result = await searchAlbumsAPI(nameArtist);

    this.setState({
      resultArtist: nameArtist,
      loading: false,
      nameArtist: '',
      album: result,
    });
  }

  inputChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  render() {
    const { nameArtist, loading, album, resultArtist } = this.state;
    const min = 2;

    return (
      <div data-testid="page-search">
        <Header />
        { loading
          ? <Loading />
          : (
            <div className="search">
              <h3>Search</h3>
              <div className="search--input">
                <label htmlFor="searchArtist">
                  <input
                    name="nameArtist"
                    placeholder="Artista / Banda"
                    data-testid="search-artist-input"
                    value={ nameArtist }
                    onChange={ this.inputChange }
                  />
                </label>
                <button
                  type="submit"
                  data-testid="search-artist-button"
                  disabled={ nameArtist.length < min }
                  onClick={ this.handleClick }
                >
                  Pesquisar
                </button>
              </div>
              { album.length > 0
                ? <CardsOfAlbum album={ album } resultArtist={ resultArtist } />
                : <p className="notAlbum"> Nenhum ??lbum foi encontrado</p> }
            </div>
          )}
      </div>
    );
  }
}

export default Search;
