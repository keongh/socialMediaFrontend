import React, { Component } from 'react';

export default class Comment extends Component {

  render(props) {
    return (
      <div>
        <p>{this.props.contents}</p>
      </div>
    );
  }
}
