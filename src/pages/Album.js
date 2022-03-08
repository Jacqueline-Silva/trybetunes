import React, { Component } from 'react';

class Album extends Component {
  constructor() {
    super();

    this.requestListAlbum = this.requestListAlbum.bind(this);
  }

  requestListAlbum() {

  }

  render() {
    return (
      <div data-testid="page-album">
        Lista de músicas do Album
      </div>
    );
  }
}

export default Album;
