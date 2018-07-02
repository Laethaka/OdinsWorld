import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./pages/Landing";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import './App.css';
import Game from "./pages/Game";
import Lobby from "./pages/Lobby";
import LandingBG from "./components/Images/landing-page.png";
import GameBG from "./components/Images/table-backgrond-3.png";
import LobbyBG from "./components/Images/paper.jpg";
import firebase, { auth, provider } from './firebase.js'

class App extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      user: null,
      current: "/landing"
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

  routeCheck = (string) => {
    if (this.state.current !== string) {
      this.setState({
        current: string
      })
    }
  }

  render() {
    let bg;
    if (this.state.current === "/landing") {
      bg = "landingBackground"
    } else if (this.state.current === "/game") {
      bg = "gameBackground"
    } else {
      bg = "lobbyBackground"
    }

    return (
      <Router>
        <div style={styles[bg]}>
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
            <Route exact path="/Lobby" render={()=><Lobby user={this.state.user} routeCheck={this.routeCheck}/>} />
            <Route exact path="/Landing" component={() => <Landing routeCheck={this.routeCheck}/>} />
            <Route exact path='/Game' component={() => <Game routeCheck={this.routeCheck}/>} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    )
  }
};


const styles = {
  landingBackground: {
    backgroundImage: `url(${LandingBG})`
  },
  lobbyBackground: {
    backgroundImage: `url(${LobbyBG})`
  },
  gameBackground: {
    backgroundImage: `url(${GameBG})`
  }
}

export default App;
