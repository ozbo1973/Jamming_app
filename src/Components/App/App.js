import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        searchResults: [],
        playlistName: "New Play List",
        playlistTracks: []
      }
      this.addTrack = this.addTrack.bind(this);
      this.removeTrack = this.removeTrack.bind(this);
      this.updatePlaylistName = this.updatePlaylistName.bind(this);
  }

  addTrack(track) {
    let tracks= this.state.playlistTracks;
    if (!tracks.includes(track)){tracks.push(track)}
    this.setState({playlistTracks: tracks});
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks.slice(tracks.indexOf(track.id),1);
    this.setState({playlistTracks: tracks});
  }

  updatePlaylistName (name) {
    this.setState({playlistName: name});
  }

  render() {
    return (
      <div>
        <h1>Ja<span clasName="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar />

            <div className="App-playlist">
              <SearchResults searchResults={this.state.searchResults}
                onAdd={this.addTrack} />

              <Playlist playlistName={this.state.playlistName}
                playlistTracks={this.state.playlistTracks}
                onRemove={this.removeTrack}
                onNameChange={this.updatePlaylistName} />

            </div>
          </div>
        </div>
    );
  }
}

export default App;
