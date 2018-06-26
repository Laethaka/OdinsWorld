import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NoMatch from "./pages/NoMatch";
import './App.css';

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default App;
