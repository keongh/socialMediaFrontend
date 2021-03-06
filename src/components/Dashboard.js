import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import Axios from 'axios';
import Navbar from './Navbar';
import Feed from './Feed';
import NewPost from './NewPost.js';
import '../Dashboard.css';

class Dashboard extends Component {
  constructor(props){
    super(props);

    this.postHandler = this.postHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);

    this.feedElement = React.createRef();
    this.newPostElement = React.createRef();

    this.state = {
      userName: "",
      posted: false,
      loggedIn: false
    }

    if (!localStorage.token) {
      this.props.history.push('/');
      alert('Please log in first!');
    }
  }

  deleteHandler(id) {
    Axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/posts/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    }).then(res => {
      console.log(res);
      Axios.get(`${process.env.REACT_APP_API_ENDPOINT}/posts`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
      }).then(res => {
        this.feedElement.current.setState({ data: res.data });
      }).catch(err => {
        console.log(err);
      })
    }).catch(err => {
      console.log(err);
    });
  }

  postHandler() {
    Axios.get(`${process.env.REACT_APP_API_ENDPOINT}/posts`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => {
      console.log(res);
      this.feedElement.current.setState({ data: res.data });
      this.newPostElement.current.setState({ newPost: "" });
    });
    Axios.get(`${process.env.REACT_APP_API_ENDPOINT}/user/${localStorage.getItem('id')}/following`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    }).then(res => {
      this.feedElement.current.setState({ following: res.data });
    })
  }

  handleLogout(props) {
    localStorage.removeItem('token');
    this.props.history.push('/');
    console.log('You are logged out!');
  }

  getUsername() {
    Axios.get(`${process.env.REACT_APP_API_ENDPOINT}/user/${localStorage.id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => {
      this.setState({userName: res.data.userName});
      this.setState({loggedIn: true});
      console.log(`username: ${this.state.userName}`);
    }).catch(err => {
      alert(err);
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      this.props.history.push('/');
    });
  }

  componentDidMount(props) {
    if (!this.state.userName) {
      this.getUsername();
    }
  }

  componentDidUpdate(props) {
    if (!localStorage.token) {
      console.log('redirecting');
    }
  }

  render() {
    if (this.state.loggedIn) {
      return (
        <div className="container">

          <div className="fixed-top">
            <Navbar history={this.props.history} userName={this.state.userName} />
          </div>

          <div className="container">

            <div className="d-flex align-items-center p-3 my-3 text-white-50 bg-purple rounded shadow-sm">
              <div className="logo-bg mr-3">
                <img src="https://img.icons8.com/nolan/64/bird.png" width="48" height="48"></img>
              </div>
              <div className="lh-100">
                <h6 className="mb-0 text-white lh-100">My Twitter Clone</h6>
                <small>It's not twitter!</small>
              </div>
            </div>

            <NewPost ref={this.newPostElement} action={this.postHandler} />

            <Feed ref={this.feedElement} deleteHandler={this.deleteHandler} updateHandler={this.postHandler} />

          </div>
        </div>
      );
    }
    else {
      return (
        <div>
        </div>
      );
    }
  }

}
export default withRouter(Dashboard);
