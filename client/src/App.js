import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./pages/Landing";
// import Register from "./pages/Register";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import './App.css';
import GameWindow from "./pages/GameWindow";
import Game from "./pages/Game";

const App = () => (
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
);

export default App;
