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
        gameId: 0,
        toprow: [],
        bottomrow: [],
        flightcard,
        cardsToDraw: 0,
        gameReady: false,
        gameRunning: false,
        playerHand: [],
        opponentHand: 0, //DOM WILL ONLY RENDER AN INTEGER
        whiteRaven: 0,
        blackRaven: 31
    };

    componentWillReceiveProps(props) {
        // console.log('this game id:', props.gameId)
        this.setState({ gameId: props.gameId })
        const database = firebase.database();
        const username = firebase.auth().currentUser.displayName;

        //CONNECTION LISTENER
        var connectionsRef = database.ref(`/games/Game${props.gameId}`);
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
                if (!this.state.gameReady) {
                    this.gamePrepare(props.gameId);
                }
            };
        });

        //LISTENING FOR WORLD CHANGES AND UPDATING STATE
        database.ref(`/games/Game${props.gameId}/world`).on('value', snap => {
            this.setState({
                toprow: snap.val().toprow,
                bottomrow: snap.val().bottomrow,
                whiteRaven: snap.val().whiteRaven,
                blackRaven: snap.val().blackRaven
            })
        });

        //LISTENING FOR DECK CHANGES AND UPDATING STATE
        database.ref(`/games/Game${props.gameId}/decks`).on('value', snap => {
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
        });

        //LISTENING FOR PLAYER STATUS AND UPDATING GAME STATE (TURNS)
        database.ref(`/games/Game${props.gameId}/`).on('value', snap => {
            if (this.state.gameReady && !this.state.gameRunning && snap.val().playerOne.ready && snap.val().playerTwo.ready) {
                this.gameStart()
            }
        });
    }

    //PLAYER ONE SETUP AND DISCONNECT LISTENING
    becomePlayerOne = () => {
        console.log('becoming player 1')
        //SERVER PLAYER VARS SETUP
        firebase.database().ref(`games/Game${this.state.gameId}/playerOne`).set({
            active: true,
            name: firebase.auth().currentUser.displayName,
            ready: false,
        })
        //LOCAL PLAYER VARS SETUP
        this.setState({ isPlayer1: true, cardsToDraw: 5, gameReady: true })
        //DISCONNECT LISTENING
        const presenceRef = firebase.database().ref(`games/Game${this.state.gameId}/playerOne/`);
        presenceRef.onDisconnect().set({
            active: false,
            name: 'Open slot',
        });
    };

    //PLAYER Two SETUP AND DISCONNECT LISTENING
    becomePlayerTwo = () => {
        console.log('becoming player 2')
        //SERVER PLAYER VARS SETUP
        firebase.database().ref(`games/Game${this.state.gameId}/playerTwo`).set({
            active: true,
            name: firebase.auth().currentUser.displayName,
            ready: false,
        })
        //LOCAL PLAYER VARS SETUP
        this.setState({ isPlayer2: true, cardsToDraw: 5 })

        //DISCONNECT LISTENING
        var presenceRef = firebase.database().ref(`games/Game${this.state.gameId}/playerTwo/`);
        presenceRef.onDisconnect().set({
            active: false,
            name: 'Open slot',
        });
    };

    gamePrepare = (gameId) => {
        let landsArr = [];
        for (let idx = 0; idx < 32; idx++) {
            landsArr.push(Math.floor(Math.random() * 5))
        }
        firebase.database().ref(`games/Game${gameId}/world`).set({
            completerow: landsArr,
            toprow: landsArr.slice(0, 16),
            bottomrow: landsArr.slice(16, 32).reverse(),
            whiteRaven: 0,
            blackRaven: 31,
        })
        firebase.database().ref(`games/Game${gameId}/decks`).set({
            player1Hand: [],
            player2Hand: [],
            player1LokiDeck: ['push', 'flip', 'slide', 'doubletrouble', 'push', 'flip', 'slide', 'doubletrouble'],
            player2LokiDeck: ['push', 'flip', 'slide', 'doubletrouble', 'push', 'flip', 'slide', 'doubletrouble'],
        }).then((snap) => {
            this.setState({ gameReady: true })
            console.log('game ready!')
        })
    };

    gameStart = () => {
        console.log('play ball! (game starting)')
        this.setState({ gameRunning: true })
        firebase.database().ref(`/games/Game${this.state.gameId}/playerOne`).update({//INITIALIZING TURN SEQUENCE
            ready: false
        })
    }

    handleCardPlay = landType => {
        if (this.state.isPlayer1 && this.state.gameRunning) {
            firebase.database().ref(`/games/Game${this.state.gameId}/world/completerow`).once('value').then((snap) => {
                if (landType === snap.val()[this.state.whiteRaven + 1]) {//LEGAL FAST MOVE
                    for (let idx = this.state.whiteRaven + 1; idx < 32; idx++) {//LOOPING TO END OF MATCHING TERRAIN
                        if (snap.val()[idx] !== landType) {//MATCHING TERRAIN ENDS
                            firebase.database().ref(`/games/Game${this.state.gameId}/world/`).update({
                                whiteRaven: idx - 1
                            })
                            break;
                        }
                    }
                } else {
                    console.log('not a legal fast move! (or they won the game)')
                }
            })
        } else if (this.state.isPlayer2 && this.state.gameRunning) {
            firebase.database().ref(`/games/Game${this.state.gameId}/world/completerow`).once('value').then((snap) => {
                if (landType === snap.val()[this.state.blackRaven - 1]) {//LEGAL FAST MOVE
                    for (let idx = this.state.blackRaven - 1; idx > -1; idx--) {//LOOPING TO END OF MATCHING TERRAIN
                        if (snap.val()[idx] !== landType) {//MATCHING TERRAIN ENDS
                            firebase.database().ref(`/games/Game${this.state.gameId}/world/`).update({
                                blackRaven: idx + 1
                            })
                            break;
                        }
                    }
                } else {
                    console.log('not a legal fast move! (or they won the game)')
                }
            })
        }
    }

        drawFlight = () => {//USER REQUESTING TO DRAW FLIGHT
            if (this.state.cardsToDraw > 1) {//PLAYER CAN KEEP DRAWING
                let newCard = Math.floor(Math.random() * 5)

                if (this.state.isPlayer1) {//ROUTING TO PLAYER 1 HAND
                    firebase.database().ref(`games/Game${this.state.gameId}/decks/player1Hand`).push(newCard)
                } else {//ROUTING TO PLAYER 2 HAND
                    firebase.database().ref(`games/Game${this.state.gameId}/decks/player2Hand`).push(newCard)
                }
                this.setState({ cardsToDraw: this.state.cardsToDraw - 1 });
            }

            if (this.state.cardsToDraw === 1) {//PLAYER DONE DRAWING
                let newCard = Math.floor(Math.random() * 5)
                if (this.state.isPlayer1) {//ROUTING TO PLAYER 1 HAND
                    firebase.database().ref(`games/Game${this.state.gameId}/decks/player1Hand`).push(newCard)
                } else {//ROUTING TO PLAYER 2 HAND
                    firebase.database().ref(`games/Game${this.state.gameId}/decks/player2Hand`).push(newCard)
                }
                this.setState({ cardsToDraw: 0 });
                if (this.state.isPlayer1) {
                    firebase.database().ref(`games/Game${this.state.gameId}/playerOne/`).update({ ready: true })
                } else if (this.state.isPlayer2) {
                    firebase.database().ref(`games/Game${this.state.gameId}/playerTwo/`).update({ ready: true })
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
                                                position={31 - idx}
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
                                                key={idx}
                                                image={landId}
                                                cardClick={this.handleCardPlay}
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
