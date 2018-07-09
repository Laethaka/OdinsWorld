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
// import LokiCard from "../../components/LokiCard";
// import lokicard from "../../LokiCard/lokicard.json";
import DrawFlight from "../../components/DrawFlight";
import DrawLoki from "../../components/DrawLoki";
import EndTurnButton from "../../components/EndTurnButton";

class Game extends Component {
    state = {
        landcard,
        flightcard,
        gameId: 0,
        toprow: [],
        bottomrow: [],
        cardsToDraw: 0,
        gameReady: false,
        gameRunning: false,
        playerHand: [],
        opponentHand: 0, //DOM WILL ONLY RENDER AN INTEGER
        whiteRaven: 0,
        blackRaven: 31,
        myTurn: false,
        gameWinner: null
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

        connectionsRef.once("value", snap => {//PAGE LOAD AND ANY PLAYER JOIN/LEAVE
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
            if (snap.val().whiteRaven === 31) {//WHITE WINS
                this.setState({ gameRunning: false, gameWinner: 'white' })
            } else if (snap.val().blackRaven === 0) {//BLACK WINS
                this.setState({ gameRunning: false, gameWinner: 'black' })
            }
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
                    // console.log('i now have this many cards: ', Object.values(myHand).length)
                    if (Object.values(myHand).length > 7) {
                        database.ref(`/games/Game${props.gameId}/decks/`).update({ player1Hand: Object.values(myHand).slice(1, 8) })
                    } else {
                        this.setState({ playerHand: Object.values(myHand) })
                    }
                } else {//PLAYER HAS NO CARDS
                    this.setState({ playerHand: [] })
                }
            } else if (this.state.isPlayer2) {//THIS WINDOW IS PLAYER 2
                let myHand = snap.val().player2Hand
                let oppHand = snap.val().player1Hand
                if (oppHand) {//UPDATING OPPONENT CARD COUNT ON DOM
                    this.setState({ opponentHand: Object.values(oppHand).length })
                }
                if (myHand) {//DISPLAYING HAND CARDS IN DOM
                    // console.log('i now have this many cards: ', Object.values(myHand).length)
                    if (Object.values(myHand).length > 7) {
                        database.ref(`/games/Game${props.gameId}/decks/`).update({ player2Hand: Object.values(myHand).slice(1, 8) })
                    } else {
                        this.setState({ playerHand: Object.values(myHand) })
                    }
                } else {
                    this.setState({ playerHand: [] })
                }
            }
        })

        //LISTENING FOR PLAYER READY DURING SETUP AND STARTING GAME
        database.ref(`/games/Game${props.gameId}/`).on('value', snap => {
            if (this.state.gameReady && !snap.val().world.gameRunning && snap.val().playerOne.ready && snap.val().playerTwo.ready) {
                this.gameStart()
            }
        });

        //LISTENING FOR TURN STATUS DURING ACTIVE GAME
        database.ref(`/games/Game${props.gameId}/world`).on('value', snap => {
            if (snap.val().gameRunning && this.state.isPlayer1 && snap.val().playerTurn === '1') {//RENDERING FOR ACTIVE PLAYER 1
                this.setState({ myTurn: true })
            } else if (snap.val().gameRunning && this.state.isPlayer1 && snap.val().playerTurn === '2') {//RENDERING FOR INACTIVE PLAYER 1
                this.setState({ myTurn: false })
            } else if (snap.val().gameRunning && this.state.isPlayer2 && snap.val().playerTurn === '1') {//RENDERING FOR INACTIVE PLAYER 2
                this.setState({ myTurn: false })
            } else if (snap.val().gameRunning && this.state.isPlayer2 && snap.val().playerTurn === '2') {//RENDERING FOR ACTIVE PLAYER 2
                this.setState({ myTurn: true })
            }
        })
    }

    //PLAYER ONE SETUP AND DISCONNECT LISTENING
    becomePlayerOne = () => {
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
            gameRunning: false
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
        // firebase.database().ref(`/games/Game${this.state.gameId}/playerOne`).update({//INITIALIZING TURN SEQUENCE
        //     ready: true
        // })
        firebase.database().ref(`/games/Game${this.state.gameId}/world`).update({//INITIALIZING TURN SEQUENCE
            gameRunning: true,
            playerTurn: '1'
        })
    }

    handleCardPlay = landType => {//PLAYER ATTEMPTING TO PLAY A CARD IN HAND
        if (this.state.isPlayer1 && this.state.gameRunning && this.state.myTurn) {//ROUTING TO PLAYER 1
            firebase.database().ref(`/games/Game${this.state.gameId}/world/completerow`).once('value', snap => {
                if (landType === snap.val()[this.state.whiteRaven + 1]) {//EXECUTING FAST MOVE
                    for (let idx = this.state.whiteRaven + 1; idx < 33; idx++) {//LOOPING TO END OF MATCHING TERRAIN
                        if (idx===32) {//WHITE RAVEN REACHED THE END
                            firebase.database().ref(`/games/Game${this.state.gameId}/world/`).update({//UPDATING RAVEN POSITION IN FIREBASE
                                whiteRaven: 31
                            })
                            break;
                        } else if (snap.val()[idx] !== landType) {//MATCHING TERRAIN ENDS
                            firebase.database().ref(`/games/Game${this.state.gameId}/world/`).update({//UPDATING RAVEN POSITION IN FIREBASE
                                whiteRaven: idx - 1
                            })
                            break;
                        }
                    }
                    firebase.database().ref(`/games/Game${this.state.gameId}/decks/player1Hand`).once('value', snap => {//REMOVING PLAYED CARD
                        let handCards = Object.values(snap.val())
                        let cutIdx = handCards.indexOf(landType)
                        handCards.splice(cutIdx, 1)
                        firebase.database().ref(`/games/Game${this.state.gameId}/decks/`).update({
                            player1Hand: handCards
                        })
                    })
                } else {//CHECKING FOR SLOW MOVE
                    let counter = 0;
                    this.state.playerHand.forEach(val => {
                        if (val === landType) { counter++ }
                    })
                    if (counter > 1) {//EXECUTING SLOW MOVE
                        // console.log('slow moving!') 
                        // console.log(snap.val()[this.state.whiteRaven + 1])
                        // console.log(snap.val()[this.state.whiteRaven + 2])
                        if (snap.val()[this.state.whiteRaven + 1] === snap.val()[this.state.whiteRaven + 2]) {//STRETCH OF SIMILAR TERRAIN AHEAD
                            for (let idx = this.state.whiteRaven + 2; idx < 33; idx++) {//LOOPING TO END OF MATCHING TERRAIN
                                // console.log('world: ', snap.val())
                                // console.log('looking at square:', snap.val()[idx])
                                // console.log('square before this:', snap.val()[idx - 1])
                                if (idx===32) {//WHITE RAVEN REACHED THE END
                                    firebase.database().ref(`/games/Game${this.state.gameId}/world/`).update({//UPDATING RAVEN POSITION IN FIREBASE
                                        whiteRaven: 31
                                    })
                                    break;
                                } else if (snap.val()[idx] !== snap.val()[idx - 1]) {//MATCHING TERRAIN ENDS
                                    firebase.database().ref(`/games/Game${this.state.gameId}/world/`).update({//UPDATING RAVEN POSITION IN FIREBASE
                                        whiteRaven: idx - 1
                                    })
                                    break;
                                }
                            }
                        } else {
                            firebase.database().ref(`/games/Game${this.state.gameId}/world/`).update({//UPDATING RAVEN POSITION IN FIREBASE
                                whiteRaven: this.state.whiteRaven + 1
                            })
                        }
                        firebase.database().ref(`/games/Game${this.state.gameId}/decks/player1Hand`).once('value', snap => {//REMOVING PLAYED CARD
                            let handCards = Object.values(snap.val());
                            handCards.sort();
                            let cutIdx = handCards.indexOf(landType);
                            handCards.splice(cutIdx, 2);
                            firebase.database().ref(`/games/Game${this.state.gameId}/decks/`).update({
                                player1Hand: handCards
                            })
                        })
                    }
                }
            })
        } else if (this.state.isPlayer2 && this.state.gameRunning && this.state.myTurn) {//ROUTING TO PLAYER 2
            firebase.database().ref(`/games/Game${this.state.gameId}/world/completerow`).once('value', snap => {
                if (landType === snap.val()[this.state.blackRaven - 1]) {//EXECUTING FAST MOVE
                    for (let idx = this.state.blackRaven - 1; idx > -2; idx--) {//LOOPING TO END OF MATCHING TERRAIN
                        if (idx===-1) {//BLACK RAVEN REACHED THE END
                            firebase.database().ref(`/games/Game${this.state.gameId}/world/`).update({//UPDATING RAVEN POSITION IN FIREBASE
                                blackRaven: 0
                            })
                            break;
                        } else if (snap.val()[idx] !== landType) {//MATCHING TERRAIN ENDS
                            firebase.database().ref(`/games/Game${this.state.gameId}/world/`).update({//UPDATING RAVEN POSITION IN FIREBASE
                                blackRaven: idx + 1
                            })
                            break;
                        }
                    }
                    firebase.database().ref(`/games/Game${this.state.gameId}/decks/player2Hand`).once('value', snap => {//REMOVING PLAYED CARD
                        let handCards = Object.values(snap.val())
                        let cutIdx = handCards.indexOf(landType)
                        handCards.splice(cutIdx, 1)
                        firebase.database().ref(`/games/Game${this.state.gameId}/decks/`).update({
                            player2Hand: handCards
                        })
                    })
                } else {
                    let counter = 0;
                    this.state.playerHand.forEach(val => {
                        if (val === landType) { counter++ }
                    })
                    if (counter > 1) {//EXECUTING SLOW MOVE
                        // console.log('slow moving!')
                        // console.log(snap.val()[this.state.whiteRaven + 1])
                        // console.log(snap.val()[this.state.whiteRaven + 2])
                        if (snap.val()[this.state.blackRaven - 1] === snap.val()[this.state.blackRaven - 2]) {//STRETCH OF SIMILAR TERRAIN AHEAD
                            for (let idx = this.state.blackRaven - 2; idx > -2; idx--) {//LOOPING TO END OF MATCHING TERRAIN
                                // console.log('world: ', snap.val())
                                // console.log('looking at square:', snap.val()[idx])
                                // console.log('square before this:', snap.val()[idx - 1])
                                if (idx===-1) {//BLACK RAVEN REACHED THE END
                                    firebase.database().ref(`/games/Game${this.state.gameId}/world/`).update({//UPDATING RAVEN POSITION IN FIREBASE
                                        blackRaven: 0
                                    })
                                    break;
                                } else if (snap.val()[idx] !== snap.val()[idx + 1]) {//MATCHING TERRAIN ENDS
                                    firebase.database().ref(`/games/Game${this.state.gameId}/world/`).update({//UPDATING RAVEN POSITION IN FIREBASE
                                        blackRaven: idx + 1
                                    })
                                    break;
                                }
                            }
                        } else {
                            // console.log('only bumping raven one square')
                            firebase.database().ref(`/games/Game${this.state.gameId}/world/`).update({//UPDATING RAVEN POSITION IN FIREBASE
                                blackRaven: this.state.blackRaven - 1
                            })
                        }
                        // console.log('done slow moving; removing cards!')
                        firebase.database().ref(`/games/Game${this.state.gameId}/decks/player2Hand`).once('value', snap => {//REMOVING PLAYED CARD
                            let handCards = Object.values(snap.val());
                            handCards.sort();
                            let cutIdx = handCards.indexOf(landType);
                            handCards.splice(cutIdx, 2);
                            firebase.database().ref(`/games/Game${this.state.gameId}/decks/`).update({
                                player2Hand: handCards
                            })
                        })
                    }
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
            if (this.state.isPlayer1 && !this.state.gameRunning) {//FLAGGING PLAYER 1 READY TO START
                firebase.database().ref(`games/Game${this.state.gameId}/playerOne/`).update({ ready: true })
            } else if (this.state.isPlayer2 && !this.state.gameRunning) {//FLAGGING PLAYER 2 READY TO START
                firebase.database().ref(`games/Game${this.state.gameId}/playerTwo/`).update({ ready: true })
            } else if (this.state.isPlayer1 && this.state.gameRunning) {//HANDING ACTIVE TURN TO PLAYER 2
                firebase.database().ref(`games/Game${this.state.gameId}/world/`).update({ playerTurn: '2' })
            } else if (this.state.isPlayer2 && this.state.gameRunning) {//HANDING ACTIVE TURN TO PLAYER 2
                firebase.database().ref(`games/Game${this.state.gameId}/world/`).update({ playerTurn: '1' })
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

    endTurnClick = () => {
        if (this.state.isPlayer1 && this.state.cardsToDraw === 0) {
            this.setState({ cardsToDraw: this.state.cardsToDraw + 3 })
        } else if (this.state.isPlayer2 && this.state.cardsToDraw === 0) {
            this.setState({ cardsToDraw: this.state.cardsToDraw + 3 })
        }
    }

    render() {

        return (
            <Container fluid>

                <div className="row info-background game-status-margin">
                    <Col size="md-4">
                        <div className="game-status-box text-center">
                            {this.state.isPlayer1 ? 
                            <div>
                                <img className="coin-size" src={require('../../components/Images/coin-2.png')} />
                                <h3 className="d-flex justify-content-center">Player One</h3>
                                <hr className="gameHr"/>
                                <h3 className="d-flex justify-content-center">Light Raven</h3>
                                </div> : null}
                            {this.state.isPlayer2 ? 
                            <div>
                                <img className="coin-size" src={require('../../components/Images/coin-1.png')} />
                                <h3 className="d-flex justify-content-center">Player Two</h3>
                                <hr className="gameHr"/>
                                <h3 className="d-flex justify-content-center">Dark Raven</h3>
                                </div> : null}
                        </div>
                    </Col>

                    <Col size="md-4">
                        <div className=" game-status-box d-flex justify-content-center text-center">
                            <h3 className="d-flex justify-content-center"></h3>
                            {this.state.myTurn && this.state.cardsToDraw == 0 && this.state.gameWinner === null ? 
                                <div>
                                    <h3 className="d-flex justify-content-center">Turn: Play Cards</h3>
                                    <hr className="gameHr"/>
                                    <p>Click Flight Cards from your hand to move</p>
                                </div> : null}

                            {this.state.myTurn && this.state.cardsToDraw > 0 && this.state.gameWinner === null ? 
                                <div>
                                    <h3 className="d-flex justify-content-center">Turn: Draw Cards </h3>
                                    <hr className="gameHr"/>
                                    <p>Cards available to draw: <span className="cardsToDrawNum">{this.state.cardsToDraw}</span></p>
                                </div> : null}

                            {!this.state.myTurn && this.state.gameWinner === null ? 
                                <div>
                                    <h3 className="d-flex justify-content-center">Waiting: Opponent's Turn</h3> 
                                    <hr className="gameHr"/>
                                </div> : null}
                                    
                            {this.state.gameWinner === 'white' && this.state.isPlayer1 ? <h3 className="d-flex justify-content-center">Victorious</h3> : null}
                            {this.state.gameWinner === 'white' && this.state.isPlayer2 ? <h3 className="d-flex justify-content-center">Defeat</h3> : null}
                            {this.state.gameWinner === 'black' && this.state.isPlayer1 ? <h3 className="d-flex justify-content-center">Defeat</h3> : null}
                            {this.state.gameWinner === 'black' && this.state.isPlayer2 ? <h3 className="d-flex justify-content-center">Victorious</h3> : null}
                        </div>
                    </Col>

                    <Col size="md-4">
                        <div className="game-status-box d-flex justify-content-center text-center">
                            {this.state.isPlayer1 && this.state.myTurn && this.state.cardsToDraw == 0 && this.state.gameWinner === null ? <h3 className="d-flex justify-content-center"><EndTurnButton buttonClick={this.endTurnClick} /></h3> : null}
                            {this.state.isPlayer2 && this.state.myTurn && this.state.cardsToDraw == 0 && this.state.gameWinner === null ? <EndTurnButton buttonClick={this.endTurnClick} /> : null}
                            {this.state.gameWinner !== null ? <a type="btn" className="btn button pr-4 pl-4" href="/lobby/">Back to Lobby</a> : null}
                        </div>
                    </Col>

                </div>

                <div className="row">
                    <div className="col-md-12 text-light mb-3">
                        <div className="d-flex justify-content-center">
                            <h4>Opponent Cards: {this.state.opponentHand}</h4>
                        </div>
                    </div>
                </div>

                <Row>
                    <Col size="md-12">
                        <Jumbotron>
                            <div className="landBoard text-center">
                                <div className="border border-warning">
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

                                <div className="border border-warning img-vert">
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
                        <div className="userBoard text-center border pt-3">
                            <Row>
                                <div className="col-sm-1 border text-light">
                                    <h4>Flight</h4>
                                    <DrawFlight deckClick={this.drawFlight} />
                                </div>
                                <div className="col-sm-1 border text-light">
                                    <h4>Loki</h4>
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
