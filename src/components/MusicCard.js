import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Loading from '../pages/Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      favorite: false,
    };

    this.getListFavorite = this.getListFavorite.bind(this);
    this.addFavorite = this.addFavorite.bind(this);
  }

  componentDidMount() {
    this.getListFavorite();
  }

  async getListFavorite() {
    const { trackId } = this.props;
    this.setState({
      loading: true,
    });

    const favs = await getFavoriteSongs();

    this.setState({
      loading: false,
      favorite: favs.some((e) => e.trackId === trackId),
    });
  }

  async addFavorite({ target }) {
    const { music } = this.props;
    this.setState({
      loading: true,
      favorite: target.checked,
    });

    if (!target.checked) {
      await removeSong(music);
    } else {
      await addSong(music);
    }

    this.setState({
      loading: false,
    });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, favorite } = this.state;

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
        <label htmlFor="favorita">
          Favorite:
          <input
            type="checkbox"
            name="favorita"
            checked={ favorite }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.addFavorite }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  music: PropTypes.shape({
    artistId: PropTypes.number,
    wrapperType: PropTypes.string,
  }).isRequired,
};

/* REF: https://pt-br.reactjs.org/docs/typechecking-with-proptypes.html#gatsby-focus-wrapper */

export default MusicCard;
