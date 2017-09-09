import React from 'react';
import './Playlist.css';
import {TrackList} from '../TrackList/TrackList';

export class Playlist extends React.Component {
  constructor(props){
    super(props);
    this.state={
      playlistName: 'New Play List'
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.showInvalidPlaylistMessage = this.showInvalidPlaylistMessage.bind(this);
  }

  handleNameChange(event){
    this.props.onNameChange(event.target.value);
    this.setState({playlistName: event.target.value});
  }

  handleSaveClick(event){
    if (this.state.playlistName === 'New Play List' || !this.state.playlistName) {
      return alert('You must have a valid playlist name')
    }
    return this.props.onSave();
  }

  showInvalidPlaylistMessage(){
      if (this.state.playlistName === 'New Play List' || !this.state.playlistName) {
        return <h6>{this.state.playlistName} is not a valid name, please rename the playlist.</h6>
      }
      return;
  }

  render() {
    return (
      <div className="Playlist">
        <input defaultValue={'New Play list'} onChange={this.handleNameChange} />

        <TrackList tracks={this.props.playlistTracks}
          onRemove={this.props.onRemove}
          isRemove={true} />

        <a className="Playlist-save" onClick={this.handleSaveClick}>SAVE TO SPOTIFY</a>
        {this.showInvalidPlaylistMessage()}
      </div>
    )
  }
}
