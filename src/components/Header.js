import React, { Component } from 'react';

export default class Header extends Component {
    render() {
      return (
        <div className="d-flex align-items-center p-3 my-3 text-white-50 bg-purple rounded shadow-sm">
          <div className="logo-bg mr-3">
            <img src="https://img.icons8.com/nolan/64/bird.png" width="48" height="48"></img>
          </div>
          <div className="lh-100">
            <h6 className="mb-0 text-white lh-100">My Twitter Clone</h6>
            <small>It's not twitter!</small>
          </div>
        </div>
      );
    }
}
