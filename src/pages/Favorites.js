import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      favoritesSongs: [],
    };

    this.getFavorites = this.getFavorites.bind(this);
  }

  componentDidMount() {
    this.getFavorites();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { favoritesSongs } = this.state;
    if (nextState.favoritesSongs !== favoritesSongs) {
      return true;
    }
  }

  componentDidUpdate() {
    this.getFavorites();
  }

  // componentDidUpdate(prevProps, prevState) {
  //   const { favoritesSongs } = this.state;
  //   if (favoritesSongs !== prevState.favoritesSongs) {
  //     getFavoriteSongs().then((response) => {
  //       this.setState({ favoritesSongs: response });
  //     });
  //   }
  // }

  async getFavorites() {
    this.setState({
      loading: true,
    });

    const favorites = await getFavoriteSongs();

    this.setState({
      loading: false,
      favoritesSongs: favorites,
    });
  }

  render() {
    const { loading, favoritesSongs } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />
        <div className="favorite">
          <h3>Favorites</h3>
          { loading && <Loading /> }
          <div className="favorite--center">
            {favoritesSongs
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
    );
  }
}

export default Favorites;
