import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./pages/Landing";
// import Register from "./pages/Register";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import './App.css';

const App = () => (
  <Router>

    <div> 
    <Nav />
      <Switch>
        <Route exact path="/" component={Landing} />
        {/* <Route exact path="/register" component={Register} /> */}
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default App;
