import React, { Component } from "react";
import Login from "./auth/Login";

export default class Home extends Component {

  render(props) {
    return (
      <div>
        <h1>My Twitter Clone</h1>
        <Login />
        <p>Need an account?</p>
        <a href="/register">Sign up</a>
      </div>
    );
  }
}
