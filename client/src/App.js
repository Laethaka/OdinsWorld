import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./pages/Landing";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import './App.css';
import Game from "./pages/Game";
import Lobby from "./pages/Lobby";
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
          <Nav user={this.state.user}>
              <div className="wrapper">
                {this.state.user ?
                  <button type="button" className="mr-3 btn log-button" onClick={this.logout}>Logout</button>
                  :
                  <button type="button" className="mr-3 btn log-button" onClick={this.login}>Log In</button>
                }
              </div>
          </Nav>
          <Switch>
            <Route exact path="/Lobby" render={()=><Lobby user={this.state.user}/>} />
            <Route exact path="/Landing" component={Landing} />
            <Route exact path='/Game' component={Game} />
            <Route exact path="/Lobby" component={Lobby} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    )
  }
};

export default App;
