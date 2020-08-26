import React, { Component } from 'react';
import './App.css';
import Home from './components/Home.js';
import Registration from './components/auth/Registration.js'
import Dashboard from './components/Dashboard.js';
import PostPage from './components/PostPage.js';

import {
  Router,
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export class App extends Component {

  render(props) {
    return (
      <div className="App">
        <BrowserRouter history={history}>
          <Switch>
            <Route path="/register" exact>
              <Registration />
            </Route>
            <Route path="/dashboard" exact>
              <Dashboard />
            </Route>
          <Route path="/dashboard/post/:id" component={PostPage} />
            <Route path="/" exact>
              <Home />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
