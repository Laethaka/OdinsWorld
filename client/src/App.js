import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import { auth, provider } from './firebase.js'

// Pages and Nav component
import Game from "./pages/Game";
import Lobby from "./pages/Lobby";
import Landing from "./pages/Landing";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

// // BACK GROUND 
// import LandingBG from "./components/Images/landing-page.png";
// import GameBG from "./components/Images/table-backgrond-3.png";
// import LobbyBG from "./components/Images/paper.jpg";

class App extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      user: null,
      current: "/landing"
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  };

  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  };

  login() {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  };

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      };
    });
  };

  routeCheck = (string) => {
    if (this.state.current !== string) {
      this.setState({
        current: string
      });
    };
  };

  render() {

    // let bg;
    // if (this.state.current === "/landing") {
    //   bg = "landingBackground"
    // } else if (this.state.current === "/game") {
    //   bg = "gameBackground"
    // } else {
    //   bg = "lobbyBackground"
    // }

    return (
      <Router>
        {/* <div style={styles[bg]}> */}
        <div>
          <Nav user={this.state.user}>
            <div className="wrapper">
              {this.state.user ?
                <div>
                  <a type="btn" className="mr-3 btn button" href={"/Lobby"}>Lobby</a>
                  <a type="btn" className="mr-3 btn button" onClick={this.logout} href={"/Landing"}>Log Out</a>
                </div>
                :
                <div>
                  <button type="btn" className="mr-3 btn button" onClick={this.login}>Log In</button>
                </div>
              }
            </div>
          </Nav>
          <Switch>
            <Route exact path="/Lobby" render={() => <Lobby user={this.state.user} />} />
            <Route exact path="/Landing" component={Landing} />
            <Route exact path='/Game/1' render={() => <Game gameId='1' />} />
            <Route exact path='/Game/2' render={() => <Game gameId='2' />} />
            <Route exact path='/Game/3' render={() => <Game gameId='3' />} />
            <Route exact path='/Game/4' render={() => <Game gameId='4' />} />
            <Route exact path='/Game/5' render={() => <Game gameId='5' />} />
            <Route exact path="/" component={Landing} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    )
  }
};

// BACK GROUND 
// const styles = {
//   landingBackground: {
//     backgroundImage: `url(${LandingBG})`
//   },
//   lobbyBackground: {
//     backgroundImage: `url(${LobbyBG})`
//   },
//   gameBackground: {
//     backgroundImage: `url(${GameBG})`
//   }
// }

export default App;
