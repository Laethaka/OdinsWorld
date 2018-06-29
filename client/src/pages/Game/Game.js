import React, { Component} from "react";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import firebase from '../../firebase'
import LandCard from "../../components/LandCard";
import landcard from "../../components/LandCard/landcard.json";

const database = firebase.database();

//VIEWER TRACKING
var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");
connectedRef.on("value", function(snap) {
  if (snap.val()) {
    var con = connectionsRef.push(true);
    con.onDisconnect().remove();
  }
});

class Game extends Component {

  state = {
      landcard
  };
  render() {
    return (
    <Container fluid>
        <Row>
            <Col size="md-12">
                <Jumbotron>
                    <div className="text-light border border-warning">
                    {this.state.landcard.map(land => (
                        <LandCard
                        id={land.id}
                        key={land.id}
                        image={land.image}
                        />
                    ))}
                    </div>
                </Jumbotron>
            </Col>
        </Row>
    </Container>
    );
  };
};

export default Game;
