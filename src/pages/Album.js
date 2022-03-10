import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';
import Header from '../components/Header';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      listSongs: [],
      nameArtist: '',
    };

    this.requestListAlbum = this.requestListAlbum.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const { params: { id } } = match;

    this.requestListAlbum(id);
  }

  async requestListAlbum(id) {
    this.setState({
      loading: true,
    });

    const listAlbum = await getMusics(id);

    this.setState({
      loading: false,
      listSongs: listAlbum,
      nameArtist: listAlbum[0].artistName,
      collection: listAlbum[0].collectionName,
      image: listAlbum[0].artworkUrl60,
    });
  }

  render() {
    const { listSongs, loading, nameArtist, collection, image } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        { loading
          ? <Loading />
          : (
            <div className="album">
              <h3>Lista de músicas do Album</h3>
              <div data-testid="artist-name" className="album--artist-name">
                { nameArtist }
              </div>
              <div data-testid="album-name" className="list">
                <div className="cardAlbumList">
                  <p>
                    Artista:
                    { nameArtist }
                  </p>
                  <p>
                    Album:
                    { collection }
                  </p>
                  <br />
                  <img src={ image } alt={ collection } width="200px" />
                </div>
                <div className="cardList">
                  {listSongs
                    .filter(({ trackName }) => trackName)
                    .map((music) => (
                      <div className="cardSong" key={ music.trackName }>
                        <MusicCard
                          music={ music }
                          trackId={ music.trackId }
                          trackName={ music.trackName }
                          previewUrl={ music.previewUrl }
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.string.isRequired,
};

export default Album;
