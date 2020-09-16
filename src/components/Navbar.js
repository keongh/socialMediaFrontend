import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggingOut: false
    };
  }

  handleLogout(props) {
    this.setState({ loggingOut: true });
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.props.history.push('/');
    console.log('You are logged out!');
    this.forceUpdate();
  }

  setLogoutButton() {
    if (this.state.loggingOut === true) {
      return (
        <button className="btn btn-secondary mr-auto" disabled>
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          Logging out...
        </button>
      );
    }
    else {
      return <button type="submit" className="btn btn-primary mr-auto" onClick={() => { this.handleLogout() }}>Logout</button>
    }
  }

  render() {
    let logOutButton = this.setLogoutButton();
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
            {logOutButton}
          </ul>
          <ul className="navbar-nav navbar-right">
            <li className="nav-item">Signed in as {this.props.userName}</li>
          </ul>
        </nav>
      </div>
    );
  }
}
