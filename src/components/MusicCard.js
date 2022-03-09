import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Loading from '../pages/Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
    };

    this.addFavorite = this.addFavorite.bind(this);
  }

  async addFavorite({ target }) {
    const { listSongs } = this.props;
    this.setState({
      loading: true,
      [target.name]: target.checked,
    });

    await addSong(listSongs);
    this.setState({
      loading: false,
    });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading } = this.state;

    return (
      <div className="song">
        { loading && <Loading />}
        { trackName }
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor="checkFav">
          Favorite:
          <input
            type="checkbox"
            name="checkFav"
            data-testid={ `checkbox-music-${trackId}` }
            onClick={ this.addFavorite }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackId: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  listSongs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MusicCard;
