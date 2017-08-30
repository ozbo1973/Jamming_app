import React from 'react';
import './Track.css';

export class Track extends React.Component {
  renderAction() {
      this.props.isRemove ? return <a className="Track-action">-</a> : return <a className="Track-action">+</a>;
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{'**Track Name'}</h3>
          <p>{'**Track Artist'} | {'**Track Album'}</p>
        </div>
        {this.renderAction()}
      </div>
    )
  }
}
