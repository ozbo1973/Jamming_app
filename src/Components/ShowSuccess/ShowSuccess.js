import React from 'react';
import './ShowSuccess.css';


export class ShowSuccess extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      success: this.props.showSuccess
    };
  } //.constructor

  viewSuccessMessage(){
    if (this.state.success) {
      return `The Playlist "${this.props.playlistName}" has been successfully created!`
    }
    return ""
  }

  render() {
    return (
      <div className="Show-Success">
        <h3>{this.viewSuccessMessage()}</h3>
        <a onClick={this.props.newList}>CREATE NEW LIST</a> <a>OPEN SPOTIFY</a>
      </div>
    )
  }//.render


}// .ShowSuccess
