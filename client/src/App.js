import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./pages/Landing";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import './App.css';
import GameWindow from "./pages/GameWindow";
import Game from "./pages/Game";
import firebase, { auth, provider } from './firebase.js'


class App extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      user: null
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }
  login() {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });
  }

  render() {
    return (
      <Router>

        <div>
          <Nav />
          <Switch>
            <Route exact path="/Landing" component={Landing} />
            <Route exact path="/GameWindow" component={GameWindow} />
            <Route exact path='/Game' component={Game} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    )
  }
};

  export default App;
