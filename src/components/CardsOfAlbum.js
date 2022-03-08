import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class CardsOfAlbum extends Component {
  render() {
    const { album, resultArtist } = this.props;
    return (
      (
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
                collectionPrice,
              }) => (
                <Link
                  to={ `/album/${collectionId}` }
                  key={ artistId }
                  data-testid={ `link-to-album-${collectionId}` }
                >
                  <div key={ artistId }>
                    <p>
                      Artista:
                      { artistName }
                    </p>
                    <p>
                      Album:
                      { collectionName }
                    </p>
                    <img src={ artworkUrl100 } alt={ collectionName } />
                    <p>
                      Preço: U$
                      { collectionPrice }
                    </p>
                    <br />
                  </div>
                </Link>
              ))
            }
          </div>
        </>
      )
    );
  }
}

CardsOfAlbum.propTypes = {
  album: PropTypes.arrayOf(PropTypes.object).isRequired,
  resultArtist: PropTypes.string.isRequired,
};

export default CardsOfAlbum;
