import React, { Component } from 'react';
import Navbar from './Navbar.js';
import Comment from './Comment.js';
import Axios from 'axios';
import NewComment from './NewComment.js';
import CommentList from './commentList.js';
import Header from './Header.js';

export default class PostPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      text: "",
      author: "",
      loaded: false,
      comments: [],
      id: undefined
    };

    this.newCommentElement = React.createRef();
    this.commentHandler = this.commentHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
  }

  commentHandler(props) {
    const { match: { params } }  = this.props;
    console.log('submitted comment');
    Axios.get(`${process.env.REACT_APP_API_ENDPOINT}/posts/${params.id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => {
      console.log("Data loaded from post page: ", res.data);
      this.setState({ comments: res.data.comments });
      this.newCommentElement.current.setState({ newComment: "" });
    });
  }

  deleteHandler(commentId) {
    const { match:  { params } } = this.props;
    console.log('Props: ', this.props);
    console.log('Comment id: ', commentId);
    Axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/posts/${params.id}/comments/${commentId}/`,  {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(() => {
      Axios.get(`${process.env.REACT_APP_API_ENDPOINT}/posts/${params.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      }).then(res => {
        this.setState({ comments: res.data.comments });
      });
    });
  }

  componentDidMount(props) {
    const { match: { params } } = this.props;
    console.log("params id: ", params.id);
    Axios.get(`${process.env.REACT_APP_API_ENDPOINT}/posts/${params.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
      }).then(res => {
        console.log("Loaded data: ", res.data);
        this.setState({ text: res.data.contents,
                        author: res.data.author.userName,
                        comments: res.data.comments,
                        id: res.data.postId,
                        loaded: true });
      }).catch(err => {
        console.log(err);
      });
  }

  render(props) {
    if (this.state.comments) {
      var comments = this.state.comments.map((obj, index) => {
        return <Comment text={obj.contents} authorName={obj.author.userName}
        myComment={obj.author.id === Number(localStorage.getItem("id"))} postId={this.state.id}
        id={obj.id} delete={this.deleteHandler} />
      });
    }
    if (this.state.loaded) {
      const { match: { params } } = this.props;
      return (
        <div className="container">
          <div className="fixed-top">
            <Navbar history={this.props.history} />
          </div>
          <Header />
          <h3>{this.state.author}</h3>
          <h6>{this.state.text}</h6>
          <div>
            <NewComment ref={this.newCommentElement} action={this.commentHandler} id={params.id} />
          </div>
          <div>
            { comments }
          </div>
        </div>
      );
    }
    else {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }
  }
}
