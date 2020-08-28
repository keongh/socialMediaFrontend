import React, { Component } from 'react';
import Navbar from './Navbar.js';
import Comment from './Comment.js';
import Axios from 'axios';
import NewComment from './NewComment.js';

export default class PostPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: {},
      loaded: false
    };

    this.newCommentElement = React.createRef();
    this.commentHandler = this.commentHandler.bind(this);
  }

  commentHandler(props) {
    const { match: { params } }  = this.props;
    console.log('submitted post');
    Axios.get(`${process.env.REACT_APP_API_ENDPOINT}/posts/${params.id}/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => {
      console.log("Data: ", res.data);
      this.setState({ data: res.data });
      this.newCommentElement.current.setState({ newComment: "" });
    });
  }

  componentDidMount(props) {
    const { match: { params } } = this.props;
    Axios.get(`${process.env.REACT_APP_API_ENDPOINT}/posts/${params.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
      })
      .then(res => {
        console.log("Loaded comments: ", res.data);
        this.setState({ data: res.data, loaded: true });
      }).catch(err => {
        console.log(err);
      });
  }

  render(props) {
    if (this.state.loaded) {
      const { match: { params } } = this.props;
      return (
        <div>
          <Navbar />
          <h3>{this.state.data.postedBy}</h3>
          <h6>{this.state.data.contents}</h6>
          <div>
            <NewComment ref={this.newCommentElement} action={this.commentHandler} id={params.id}/>
          </div>
          <div>
            <h3>Comments</h3>
            <div>
              { this.state.data.comments.map((obj, index) => {
                  return <Comment contents={obj.contents} key={index} />
            }) }
            </div>
          </div>
        </div>
      );
    }
    else  {
      return (
        <div>
          <p>Loading...</p>
        </div>
      )
    }
  }
}
