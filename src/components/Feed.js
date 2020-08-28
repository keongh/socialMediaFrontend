import React, { Component } from 'react';
import Axios from 'axios';
import Post from './Post.js';
import '../Dashboard.css';

export default class Feed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      data: []
    }
  }

  componentDidMount(props) {
    Axios.get(`${process.env.REACT_APP_API_ENDPOINT}/posts`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => {
      console.log(res);
      this.setState({ loaded: true });
      this.setState({ data: res.data });
    });
  }


  render(props) {

    return (
      <div className="my-3 p-3 bg-white rounded shadow-sm">
        <h6 className="border-bottom border-gray feed">Your Feed</h6>
        <div>
          { this.state.data.map((obj, index) => {
              return <Post text={obj.contents} author={obj.postedBy} deleteHandler={this.props.deleteHandler} id={obj.postId} />;
          })}
        </div>
      </div>
    );
  }
}
