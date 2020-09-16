import React, { Component } from 'react';
import axios from 'axios';

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      registrationErrors: {},
      registering: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  validatePassword() {
    if (this.state.password !== this.state.password_confirmation) {
      this.setState({ registrationErrors:
        { password: 'Passwords must match!' },
        registering: false
      });
      return false;
    }
    return true;
  }

  handleSubmit(event) {
    this.setState({ registering: true });
    if (this.validatePassword()) {
      this.setState({ registrationErrors: {} });
      axios.post(`${process.env.REACT_APP_API_ENDPOINT}/register`, {
        "userName": this.state.email,
        "password": this.state.password
      },
      { withCredentials: true }).then(response => {
        console.log("registration res: ", response);
        axios.post(`${process.env.REACT_APP_API_ENDPOINT}/login`, {
          "username": this.state.email,
          "password": this.state.password
        },
        { withCredentials: true }).then(res => {
          localStorage.setItem('token', res.data.jwt);
          localStorage.setItem('id', res.data.id);
          window.location.href = '/dashboard';
        }).catch(err => {
          console.log('Login error: ' + err);
          alert('Could not log user in');
        });
      }).catch(err => {
        if (err.response.status === 409) {
          this.setState({
            registrationErrors: { user: 'Email is already in use' },
            registering: false
          });
        }
      });
    }
    event.preventDefault();
  }

  setRegisterButton() {
    if (this.state.registering === true) {
      return (
        <button type="submit" className="btn btn-secondary btn-log btn-block" disabled>
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          Registering...
        </button>
      );
    }
    else {
      return <button type="submit" className="btn btn-primary btn-lg btn-block">Register</button>;
    }
  }

  render() {
    let registerButton = this.setRegisterButton();
    return (
      <div>
        <h1>Create an account</h1>
        <form onSubmit={this.handleSubmit} className="form-signin">
          <div className="form-group">
            <input className="form-control"
              type="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
            <label htmlFor="email">Email address</label>
            <div className="text-danger">{this.state.registrationErrors.user}</div>
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

          <div className="form-group">
            <input className="form-control"
              type="password"
              name="password_confirmation"
              placeholder="Password Confirmation"
              value={this.state.password_confirmation}
              onChange={this.handleChange}
              required
            />
            <label htmlFor="password_confirmation">Confirm Password</label>
            <div className="text-danger">{this.state.registrationErrors.password}</div>
          </div>

          {registerButton}

        </form>
      </div>
    );
  }
}
