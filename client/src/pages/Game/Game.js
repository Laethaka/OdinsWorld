import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import firebase from '../../firebase'
import LandCard from "../../components/LandCard";
import landcard from "../../components/LandCard/landcard.json";
import "./Game.css";
import axios from 'axios';

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

        connectionsRef.once("value").then((snap) => {//PAGE LOAD AND ANY PLAYER JOIN/LEAVE
            if (snap.val().playerOne.active === false) {
                this.becomePlayerOne();
            } else if (snap.val().playerTwo.active === false) {
                this.becomePlayerTwo();
                this.gameStart(this.state.gameId);
                // } else {
                //     console.log('both players found');
                //     // becomeSpectator();
            };
        });
    }

    //PLAYER ONE SETUP AND DISCONNECT LISTENING
    becomePlayerOne = () => {
        //SERVER PLAYER VARS SETUP
        firebase.database().ref(`games/Game${this.state.gameId}/playerOne`).set({
            active: true,
            name: firebase.auth().currentUser.displayName,
            move: ''
        })
        //LOCAL PLAYER VARS SETUP
        this.setState({ isPlayer1: true })
        //DISCONNECT LISTENING
        const presenceRef = firebase.database().ref(`games/Game${this.state.gameId}/playerOne/active`);
        presenceRef.onDisconnect().set(false);
    };

    //PLAYER Two SETUP AND DISCONNECT LISTENING
    becomePlayerTwo = () => {
        //SERVER PLAYER VARS SETUP
        firebase.database().ref(`games/Game${this.state.gameId}/playerTwo`).set({
            active: true,
            name: firebase.auth().currentUser.displayName,
            move: ''
        })
        //LOCAL PLAYER VARS SETUP
        this.setState({ isPlayer2: true })
        //DISCONNECT LISTENING
        const presenceRef = firebase.database().ref(`games/Game${this.state.gameId}/playerTwo/active`);
        presenceRef.onDisconnect().set(false);
    };

    gameStart = (gameId) => {
        axios.get(`/gameroute/gamestart/${gameId}`)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

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
