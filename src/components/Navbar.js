import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  constructor(props) {
    super(props);
  }

  handleLogout(props) {
    localStorage.removeItem('token');
    this.props.history.push('/');
    console.log('You are logged out!');
    this.forceUpdate();
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-brand nav-item">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link">My Profile</Link>
            </li>
            <button type="submit" className="btn btn-primary mr-auto" onClick={() => { this.handleLogout() }}>Logout</button>
          </ul>
          <ul className="navbar-nav navbar-right">
            <li className="nav-item">Signed in as {this.props.userName}</li>
          </ul>
        </nav>
      </div>
    );
  }
}
