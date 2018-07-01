import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import firebase from '../../firebase'
import LandCard from "../../components/LandCard";
import landcard from "../../components/LandCard/landcard.json";
import "./Game.css";

class Game extends Component {
    state = {
        landcard,
        gameId: 1
    };

    componentWillReceiveProps() {
        const database = firebase.database();
        const username = firebase.auth().currentUser.displayName;

        //CONNECTION LISTENER
        var connectionsRef = database.ref(`/games/Game${this.state.gameId}`);
        var connectedRef = database.ref(".info/connected");
        connectedRef.on("value", snap => {
            if (snap.val()) {
                var con = connectionsRef.push(username);
                con.onDisconnect().remove();
            }
        });
    }

  state = {
      landcard
  };

  render() {
    return (
    <Container fluid>
        <Row>
            <Col size="md-12">
                <Jumbotron>
                  <div className="text-center">
                    <div className="text-light border border-warning">
                    {this.state.landcard.map(land => (
                        <LandCard
                        id={land.id}
                        key={land.id}
                        image={land.image}
                        />
                    ))}
                    </div>

                    <div className="text-light border border-warning img-vert">
                    {this.state.landcard.map(land => (
                        <LandCard
                        id={land.id}
                        key={land.id}
                        image={land.image}
                        />
                    ))}
                    </div>
                  </div>
                </Jumbotron>
            </Col>
        </Row>

        <Row>
            <Col size="md-12">

            </Col>
        </Row>

    </Container>
    );
  };
};

export default Game;
