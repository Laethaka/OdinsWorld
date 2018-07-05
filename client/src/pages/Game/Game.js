import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import "./Game.css";
import axios from 'axios';

// Firebase
import firebase from '../../firebase'

// Card components
import LandCard from "../../components/LandCard";
import landcard from "../../components/LandCard/landcard.json";
import FlightCard from "../../components/FlightCard";
import flightcard from "../../components/FlightCard/flightcard.json";
import DrawFlight from "../../components/DrawFlight";
import DrawLoki from "../../components/DrawLoki";

class Game extends Component {
    state = {
        landcard,
        flightcard,
        gameId: 1,
        toprow: [],
        bottomrow: [],
        flightcard,
        cardsToDraw: 0,
        gameRunning: false,
        playerHand: [],
        opponentHand: 0, //DOM WILL ONLY RENDER AN INTEGER
        whiteRaven: 0,
        blackRaven: 31
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
                if (!this.state.gameRunning) {
                    this.gameStart(this.state.gameId);
                    this.setState({ gameRunning: true })
                }
            };
        });

        //LISTENING FOR WORLD CHANGES AND UPDATING STATE
        database.ref(`/games/Game${this.state.gameId}/world`).on('value', snap => {
            this.setState({
                toprow: snap.val().toprow,
                bottomrow: snap.val().bottomrow,
            })
        })

        //LISTENING FOR DECK CHANGES AND UPDATING STATE
        database.ref(`/games/Game${this.state.gameId}/decks`).on('value', snap => {
            if (this.state.isPlayer1) {//THIS WINDOW IS PLAYER 1
                let myHand = snap.val().player1Hand
                let oppHand = snap.val().player2Hand
                if (oppHand) {//UPDATING OPPONENT CARD COUNT ON DOM
                    this.setState({ opponentHand: Object.values(oppHand).length })
                }
                if (myHand) {//DISPLAYING HAND CARDS IN DOM
                    this.setState({ playerHand: Object.values(myHand) })
                }
            } else if (this.state.isPlayer2) {//THIS WINDOW IS PLAYER 2
                let myHand = snap.val().player2Hand
                let oppHand = snap.val().player1Hand
                if (oppHand) {//UPDATING OPPONENT CARD COUNT ON DOM
                    this.setState({ opponentHand: Object.values(oppHand).length })
                }
                if (myHand) {//DISPLAYING HAND CARDS IN DOM
                    this.setState({ playerHand: Object.values(myHand) })
                }
            }
        })
    }

    //PLAYER ONE SETUP AND DISCONNECT LISTENING
    becomePlayerOne = () => {
        console.log('becoming player 1')
        //SERVER PLAYER VARS SETUP
        firebase.database().ref(`games/Game${this.state.gameId}/playerOne`).set({
            active: true,
            name: firebase.auth().currentUser.displayName,
            ready: false
        })
        //LOCAL PLAYER VARS SETUP
        this.setState({ isPlayer1: true, cardsToDraw: 5 })
        //DISCONNECT LISTENING
        const presenceRef = firebase.database().ref(`games/Game${this.state.gameId}/playerOne/active`);
        presenceRef.onDisconnect().set(false);
    };

    //PLAYER Two SETUP AND DISCONNECT LISTENING
    becomePlayerTwo = () => {
        console.log('becoming player 2')
        //SERVER PLAYER VARS SETUP
        firebase.database().ref(`games/Game${this.state.gameId}/playerTwo`).set({
            active: true,
            name: firebase.auth().currentUser.displayName,
            ready: false
        })
        //LOCAL PLAYER VARS SETUP
        this.setState({ isPlayer2: true, cardsToDraw: 5 })

        //DISCONNECT LISTENING
        var presenceRef = firebase.database().ref(`games/Game${this.state.gameId}/playerTwo/active`);
        presenceRef.onDisconnect().set(false);
    };

    gameStart = (gameId) => {
        let landsArr = [];
        for (let idx = 0; idx < 32; idx++) {
            landsArr.push(Math.floor(Math.random() * 5))
        }
        firebase.database().ref(`games/Game${gameId}/world`).set({
            toprow: landsArr.slice(0, 16),
            bottomrow: landsArr.slice(16, 32)
        })
        firebase.database().ref(`games/Game${gameId}/decks`).set({
            player1Hand: [],
            player2Hand: [],
            player1LokiDeck: ['push', 'flip', 'slide', 'doubletrouble', 'push', 'flip', 'slide', 'doubletrouble'],
            player2LokiDeck: ['push', 'flip', 'slide', 'doubletrouble', 'push', 'flip', 'slide', 'doubletrouble'],
        }).then((snap) => {
            console.log('done setting up!')
        })
    }

    drawFlight = () => {//USER REQUESTING TO DRAW FLIGHT
        if (this.state.cardsToDraw > 0) {//PLAYER HAS DRAWING PERMISSION
            let newCard = Math.floor(Math.random() * 5)

            if (this.state.isPlayer1) {//ROUTING TO PLAYER 1 HAND
                firebase.database().ref(`games/Game${this.state.gameId}/decks/player1Hand`).push(newCard)
            } else {//ROUTING TO PLAYER 2 HAND
                firebase.database().ref(`games/Game${this.state.gameId}/decks/player2Hand`).push(newCard)
            }
            this.setState({ cardsToDraw: this.state.cardsToDraw - 1 });
            if (this.state.cardsToDraw === 0) {//PLAYER DONE DRAWING
                if (this.state.isPlayer1) {
                    firebase.database().ref(`games/Game${this.state.gameId}/playerOne/`).update({ ready: true })
                } else if (this.state.isPlayer1) {
                    firebase.database().ref(`games/Game${this.state.gameId}/playerTwo/`).update({ ready: true })
                }
            }
        }
    };

    drawLoki = () => {//USER REQUESTING TO DRAW LOKI
        if (this.state.cardsToDraw > 0) {//PLAYER HAS DRAWING PERMISSION
            let newCard = 'loki card!'

            if (this.state.isPlayer1) {//ROUTING TO PLAYER 1 HAND
                firebase.database().ref(`games/Game${this.state.gameId}/decks/player1Hand`).push(newCard)
            } else {//ROUTING TO PLAYER 2 HAND
                firebase.database().ref(`games/Game${this.state.gameId}/decks/player2Hand`).push(newCard)
            }
            this.setState({ cardsToDraw: this.state.cardsToDraw - 1 });
            if (this.state.cardsToDraw === 0) {//PLAYER DONE DRAWING
                if (this.state.isPlayer1) {
                    firebase.database().ref(`games/Game${this.state.gameId}/playerOne/`).update({ ready: true })
                } else if (this.state.isPlayer1) {
                    firebase.database().ref(`games/Game${this.state.gameId}/playerTwo/`).update({ ready: true })
                }
            }
        }
    };

    render() {

        return (
            <Container fluid>
                <Row>
                    <Col size="md-12">
                        <Jumbotron>
                            <div className="landBoard text-center">
                                <div className="text-light border border-warning">
                                    {this.state.toprow.map((landId, idx) => (
                                        <LandCard
                                            position={idx}
                                            key={idx}
                                            image={landId}
                                            whiteRaven={this.state.whiteRaven}
                                            blackRaven={this.state.blackRaven}
                                        />
                                    ))}
                                </div>

                                <div className="text-light border border-warning img-vert">
                                    {this.state.bottomrow.map((landId, idx) => (
                                        <LandCard
                                            position={31-idx}
                                            key={idx}
                                            image={landId}
                                            whiteRaven={this.state.whiteRaven}
                                            blackRaven={this.state.blackRaven}
                                        />
                                    ))}
                                </div>
                            </div>
                        </Jumbotron>
                    </Col>
                </Row>

                <Row>
                    <Col size="md-12">
                        <div className="userBoard text-center border pt-5">
                            <Row>
                                <div className="col-sm-2 border">
                                    <DrawFlight deckClick={this.drawFlight} />
                                    <DrawLoki deckClick={this.drawLoki} />
                                </div>

                                <div className="col-sm-8 border text-light">
                                    <h4>Your Hand</h4>
                                    {this.state.playerHand.map((landId, idx) => (
                                        <FlightCard
                                            position={idx}
                                            key={idx}
                                            image={landId}
                                        />
                                    ))}
                                    <h4>Opponent Cards: {this.state.opponentHand}</h4>
                                    <h4>Cards available to draw: {this.state.cardsToDraw}</h4>
                                </div>

                                <div className="col-sm-2 border text-light">
                                    <h4>Discard</h4>
                                </div>

                            </Row>
                        </div>
                    </Col>
                </Row>

            </Container>
        );
    };
};

export default Game;
