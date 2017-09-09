import React from 'react';
import './ShowSuccess.css';
import {Spotify} from '../../Util/Spotify'


export class ShowSuccess extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      success: this.props.showSuccess
    };
    this.handleSpotifyLinkOnClick = this.handleSpotifyLinkOnClick.bind(this);
  } //.constructor

  viewSuccessMessage(){
    if (this.state.success) {
      return `The Playlist "${this.props.playlistName}" has been successfully created!`
    }
    return ""
  }

  buildSpotifyLink() {
    const playlistId = Spotify.getNewlyCreatedPlaylist();
    let userId = Spotify.getUserId();
    window.open(`https://open.spotify.com/user/${userId}/playlist/${playlistId}`);

    //return Spotify.getUserId().then(result => userId = result).then(() => {
      //console.log(userId);

      //window.location.href=`https://open.spotify.com/user/${userId}/playlist/${playlistId}`

    //});

  }

  handleSpotifyLinkOnClick (event){
    this.buildSpotifyLink();
    this.props.newList();
  }

  render() {
    return (
      <div className="Show-Success">
        <h3>{this.viewSuccessMessage()}</h3>
        <a onClick={this.props.newList}>CREATE NEW LIST</a> <a onClick={this.handleSpotifyLinkOnClick}>OPEN SPOTIFY</a>
      </div>
    )
  }//.render


}// .ShowSuccess
