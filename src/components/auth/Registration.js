import React, { Component } from 'react';
import axios from 'axios';

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      registrationErrors: ""
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
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/register`, {
      "userName": this.state.email,
      "password": this.state.password
    },
    { withCredentials: true }).then(response => {
      console.log("registration res: ", response);
    }).catch(error => {
      console.log("registration error: ", error);
    })
    event.preventDefault();
  }

  render() {
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
          </div>

          <button type="submit" className="btn btn-primary btn-lg btn-block">Register</button>

        </form>
      </div>
    );
  }
}
