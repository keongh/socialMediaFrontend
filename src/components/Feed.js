import React, { Component } from 'react';
import Axios from 'axios';
import Post from './Post.js';
import '../Dashboard.css';

export default class Feed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      data: [],
      following: []
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
    Axios.get(`${process.env.REACT_APP_API_ENDPOINT}/user/${localStorage.getItem('id')}/following`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    }).then(res => {
      this.setState({ following: res.data });
    });
  }


  render(props) {

    return (
      <div className="my-3 p-3 bg-white rounded shadow-sm">
        <h6 className="border-bottom border-gray feed">Your Feed</h6>
        <div>
          { this.state.data.map((obj, index) => {
              let likedBy = obj.likes.map(item => item.id);
              let following = this.state.following.map(user => user.id)
                .includes(obj.author.id);
              return <Post text={obj.contents} author={obj.author}
              deleteHandler={this.props.deleteHandler} id={obj.postId}
              updateHandler={this.props.updateHandler}
              followHandler={this.props.followUser}
              liked={likedBy.includes(Number(localStorage.getItem('id')))}
              followed={following}
              myPost={obj.author.id === Number(localStorage.getItem("id"))} />;
          })}
        </div>
      </div>
    );
  }
}
