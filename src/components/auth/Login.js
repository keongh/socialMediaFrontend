import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import './floating-labels.css';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loggingIn: "false"
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    this.setState({ loggingIn: true });
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/login`, {
      "username": this.state.email,
      "password": this.state.password
    },
    { withCredentials: true }).then(res => {
      console.log("Login response: ", res);
      console.log('Response status: ', res.status);
        localStorage.setItem("token", res.data.jwt);
        localStorage.setItem("id", res.data.id);
        console.log('Stored token: ', localStorage.token);
        this.forceUpdate();
      }).catch(err => {
        this.setState({ loggingIn: false });
        alert('Login failed. Please try again.');
    });
    event.preventDefault();
  }

  setLoginButton() {
    if (this.state.loggingIn === true) {
      return (
        <button type="submit" className="btn btn-secondary btn-lg btn-block" disabled>
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          Loading...
        </button>
      );
    }
    else {
      return <button type="submit" className="btn btn-primary btn-lg btn-block">Login</button>;
    }
  }

  render(props) {
    let loginButton = this.setLoginButton();
    if (localStorage.token === undefined) {
      return (
        <div>
          <form onSubmit={this.handleSubmit} className="form-signin">
            <div className="form-group">
              <input className="form-control"
                autoFocus
                type="email"
                name="email"
                placeholder="Email address"
                value={this.state.email}
                onChange={this.handleChange}
                required
              />
              <label htmlFor="email">Email address</label>
            </div>

            <div className="form-group">
              <input className="form-control"
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
                required
              />
              <label htmlFor="password">Password</label>
            </div>

          {loginButton}
          </form>
        </div>
      );
    }

    else {
      return (
        <div>
          <Redirect to="/dashboard" props={localStorage.getItem('id')}/>
        </div>
      );
    }
  }
}
