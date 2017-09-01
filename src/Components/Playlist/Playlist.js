import React from 'react';
import './Playlist.css';
import {TrackList} from '../TrackList/TrackList';

export class Playlist extends React.Component {
  render() {
    return (
      <div className="Playlist">
        <input value={'New Playlist'}/>
        <TrackList tracks={this.props.playlistTracks}
          onRemove={this.props.onRemove} />
        <a className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    )
  }
}