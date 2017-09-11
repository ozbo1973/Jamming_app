import React from 'react';
import './ShowSuccess.css';
import {Spotify} from '../../Util/Spotify'


export class ShowSuccess extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      success: this.props.showSuccess
    };
    this.viewSuccessMessage = this.viewSuccessMessage.bind(this);
    this.handleSpotifyLinkOnClick = this.handleSpotifyLinkOnClick.bind(this);
  } //.constructor

  viewSuccessMessage(){
    if (this.state.success) {
      return `The Playlist "${this.props.playlistName}" has been successfully created!`
    }
    return ""
  }// .viewSuccessMessage

  buildSpotifyLink() {
    const playlistId = Spotify.getNewlyCreatedPlaylist();
    const userId = Spotify.getUserId();
    window.open(`https://open.spotify.com/user/${userId}/playlist/${playlistId}`);
  }// . buildSpotifyLink

  handleSpotifyLinkOnClick (event){
    this.buildSpotifyLink();
    this.props.newList();
  }// .handleSpotifyLinkOnClick

  render() {
    return (
      <div className="Show-Success">
        <h3>{this.viewSuccessMessage()}</h3>
        <a onClick={this.props.newList}>CREATE NEW LIST</a> <a onClick={this.handleSpotifyLinkOnClick}>OPEN SPOTIFY</a>
      </div>
    )
  }//.render


}// .ShowSuccess
