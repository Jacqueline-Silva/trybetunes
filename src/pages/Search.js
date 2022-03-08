import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
    console.log(target.name, target.value);
  }

  render() {
    const { nameArtist, loading, album, resultArtist } = this.state;
    const min = 2;
    console.log(album, resultArtist);

    return (
      <div data-testid="page-search">
        { loading
          ? <Loading />
          : (
            <>
              <h3>Search</h3>
              <label htmlFor="searchArtist">
                <input
                  name="nameArtist"
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
              { album.length > 0
                ? (
                  <>
                    <div>
                      { `Resultado de álbuns de: ${resultArtist}` }
                    </div>
                    <div>
                      {
                        album.map(({
                          artistName,
                          artworkUrl100,
                          artistId,
                          collectionName,
                          collectionId,
                        }) => (
                          <Link
                            to={ `/album/${collectionId}` }
                            key={ artistId }
                            data-testid={ `link-to-album-${collectionId}` }
                          >
                            <img src={ artworkUrl100 } alt={ collectionName } />
                            <p>{ collectionName }</p>
                            <p>{ artistName }</p>
                          </Link>
                        ))
                      }
                    </div>
                  </>
                )
                : <p>Nenhum álbum foi encontrado</p> }
            </>
          )}
      </div>
    );
  }
}

export default Search;
