import React from "react";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import firebase from '../../firebase'

// const database = firebase.database();

// //VIEWER TRACKING
// var connectionsRef = database.ref("/connections");
// var connectedRef = database.ref(".info/connected");
// connectedRef.on("value", function(snap) {
//   if (snap.val()) {
//     var con = connectionsRef.push(true);
//     con.onDisconnect().remove();
//   }
// });

const Game = () => (
  <Container fluid>
    <Row>
      <Col size="md-12">
        <Jumbotron>
          <h1>Game Page!</h1>
        </Jumbotron>
      </Col>
    </Row>
  </Container>
);

export default Game;
