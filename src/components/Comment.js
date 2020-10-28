import React, { Component } from 'react';
import Axios from 'axios';

export default class Comment extends Component {
  constructor(props) {
    super(props);
  }

  render(props) {
    let trashcan = "";
    if (this.props.myComment) {
      trashcan = (
        <div>
          <svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" onClick={() => this.props.delete(this.props.id)}>
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
          </svg>
        </div>
      );
    }

    return (
      <div className="media text-muted pt-3">
        <svg className="bd-placeholder-img mr-2 rounded" width="32" height="32"
        xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidyMid slice"
        focusable="false" role="img" aria-label="Placeholder">
          <title>Placeholder</title>
          <rect width="100%" height="100%" fill="#007bff"></rect>
          <text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text>
        </svg>
        <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
          <strong className="d-block text-gray-dark">{this.props.authorName}</strong>

          {this.props.text}
          </p>
          {trashcan}

      </div>
    );
  }
}
