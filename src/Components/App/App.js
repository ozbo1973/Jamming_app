import React from 'react';
//import logo from './logo.svg';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';
import {ShowSuccess} from '../ShowSuccess/ShowSuccess';
import {Spotify} from '../../Util/Spotify';

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        searchResults: [],
        playlistName: "New Play List",
        playlistTracks: [],
        success: false
      };

      this.addTrack = this.addTrack.bind(this);
      this.removeTrack = this.removeTrack.bind(this);
      this.updatePlaylistName = this.updatePlaylistName.bind(this);
      this.savePlaylist = this.savePlaylist.bind(this);
      this.search = this.search.bind(this);
      this.resetToCreateList = this.resetToCreateList.bind(this);
  } //.constructor

  renderPageView() {
    console.log('this is' + this.state.success);
    if (this.state.success) {
      return <ShowSuccess showSuccess={this.state.success}
              playlistName= {this.state.playlistName}
              newList={this.resetToCreateList} />
    }
    return (
        <div>
          <SearchBar onSearch={this.search} />

          <div id="App-playlist" className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}
              onAdd={this.addTrack} />

              <Playlist playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist} />
            </div>
        </div>
    )
  } // .renderPageView

  addTrack(track) {
    let tracks= this.state.playlistTracks;
    if (!tracks.includes(track)){tracks.push(track)}
    this.setState({playlistTracks: tracks});
  }

  removeTrack(track) {
    //let tracks = this.state.playlistTracks.filter(selectedTrack => selectedTrack.id !== track.id);
    this.setState({playlistTracks: this.state.playlistTracks.filter(selectedTrack => selectedTrack.id !== track.id)});
  }

  updatePlaylistName (name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    let trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName,trackURIs).then(() => {
      this.setState({
        success: true
      })
    });
  }

  search(term) {
    Spotify.search(term).then(resultOfSearch => {
      this.setState({searchResults: resultOfSearch})
    })
  } // .search

  resetToCreateList(){
    if (this.state.success){
      this.setState({
        success: false,
        playlistName: 'New Playlist',
        playlistTracks: [],
        searchResults: []
      })
    }
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing with <span className="highlight">BBove</span></h1>
        <div className="App">
          {this.renderPageView()}
        </div>
      </div>
    );
  }
}

export default App;
