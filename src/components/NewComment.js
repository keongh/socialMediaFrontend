import React, { Component } from 'react';
import Axios from 'axios';

export default class NewComment extends Component {

  constructor(props) {
    super(props);

    this.state = {
      newComment: ""
    };
  }

  handleSubmit(props) {
    Axios.post(`${process.env.REACT_APP_API_ENDPOINT}/posts/${this.props.id}/comments`, {
        "contents": this.state.newComment
      },
      { headers: {Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => {
      console.log(res);
      this.setState({
        submitted: true,
        newComment: ""
      });
      this.props.action();
    });

  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">Post a comment</span>
        </div>
        <textarea className="form-control"
        aria-label="Post something"
        name="newComment"
        value={this.state.newComment}
        onChange={(event) => this.handleChange(event)}></textarea>
        <button type="submit" className="btn btn-sm btn-primary"
        onClick={() => this.handleSubmit(this.props)}>Post</button>
    </div>
    );
  }
}
