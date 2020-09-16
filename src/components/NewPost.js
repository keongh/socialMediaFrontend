import React, { Component } from 'react';
import Axios from 'axios';

export default class NewPost extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newPost: "",
      submitted: false,
      submitting: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(props) {
    this.setState({ submitting: true });
    console.log('Creating post: ' + this.state.newPost);
    Axios.post(`${process.env.REACT_APP_API_ENDPOINT}/posts`, {
        "contents": this.state.newPost
      },
      { headers: {Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => {
      console.log(res);
      this.setState({
        submitted: true,
        submitting: false
      });
      this.props.action();
    });
  }

  setSubmitButton(props) {
    if (this.state.submitting === true) {
      return (
        <button className="btn btn-sm btn-secondary" disabled>
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          Submitting...
        </button>
      );
    }
    else {
      return <button type="submit" className="btn btn-sm btn-primary" onClick={() => this.handleSubmit(props)}>Post</button>
    }
  }

  render(props) {
    let submitButton = this.setSubmitButton();
    return (
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">Create a post</span>
        </div>
        <textarea className="form-control"
        aria-label="Post something"
        name="newPost"
        value={this.state.newPost}
        onChange={(event) => this.handleChange(event)}></textarea>
        {submitButton}
    </div>
    );
  }
}
