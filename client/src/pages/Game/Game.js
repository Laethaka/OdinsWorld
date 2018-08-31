import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import "./Game.css";

// Firebase
import firebase from '../../firebase'
 
// Card components
import LandCard from "../../components/LandCard";
import landcard from "../../components/LandCard/landcard.json";
import FlightCard from "../../components/FlightCard";
import flightcard from "../../components/FlightCard/flightcard.json";
import DrawFlight from "../../components/DrawFlight";
import DrawLoki from "../../components/DrawLoki";
import EndTurnButton from "../../components/EndTurnButton";
import Modal from "../../components/Modal";

class Game extends Component {
    state = {
        landcard,
        flightcard,
        gameId: 0,
        completerow: [],
        toprow: [],
        bottomrow: [],
        cardsToDraw: 0,
        playerOneName: "",
        playerTwoName: "",
        gameReady: false,
        gameRunning: false,
        playerHand: [],
        opponentHand: 0, //DOM WILL ONLY RENDER AN INTEGER
        whiteRaven: 0,
        blackRaven: 31,
        myTurn: false,
        gameWinner: null,
        myLokiDeck: 8,
        oppLokiDeck: 8,
        showingHand: true,
        showingPush: false,
        showingFlip: false,
        showingSwap: false,
        showingDoubleTrouble: false,
        showingLandAdd: false,
        instaDrawing: false,
        swapCards: [],
        audioToggle: true,
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
            // console.log(connectionsRef)
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
        database.ref(`/games/Game${props.gameId}/playerOne/`).on('value', snap => {
            this.setState({ playerOneName: snap.val().name })
        });
        database.ref(`/games/Game${props.gameId}/playerTwo/`).on('value', snap => {
            this.setState({ playerTwoName: snap.val().name })
        });
        database.ref(`/games/Game${props.gameId}/world`).on('value', snap => {
            this.setState({
                completerow: snap.val().completerow,
                toprow: snap.val().toprow,
                bottomrow: snap.val().bottomrow,
                whiteRaven: snap.val().whiteRaven,
                blackRaven: snap.val().blackRaven,
                lastCardPlayed: snap.val().lastCardPlayed
            })
            if (snap.val().whiteRaven === this.state.completerow.length - 1) {//WHITE WINS
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
                let myLoki = snap.val().player1LokiDeck
                let oppLoki = snap.val().player2LokiDeck

                if (oppHand) {//UPDATING OPPONENT CARD COUNT ON DOM
                    this.setState({ opponentHand: Object.values(oppHand).length })
                } else {
                    this.setState({ opponentHand: 0 })
                }
                if (myLoki) {//UPDATING MY LOKI DECK COUNT ON DOM
                    this.setState({ myLokiDeck: myLoki.length })
                } else {
                    this.setState({ myLokiDeck: 0 })
                }
                if (oppLoki) {//UPDATING OPPONENT LOKI DECK COUNT ON DOM
                    this.setState({ oppLokiDeck: oppLoki.length })
                } else {
                    this.setState({ oppLokiDeck: 0 })
                }
                if (myHand) {//DISPLAYING HAND CARDS IN DOM
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
                let myLoki = snap.val().player2LokiDeck
                let oppLoki = snap.val().player1LokiDeck
                if (oppHand) {//UPDATING OPPONENT CARD COUNT ON DOM
                    this.setState({ opponentHand: Object.values(oppHand).length })
                } else {
                    this.setState({ opponentHand: 0 })
                }
                if (myLoki) {//UPDATING MY LOKI DECK COUNT ON DOM
                    this.setState({ myLokiDeck: myLoki.length })
                } else {
                    this.setState({ myLokiDeck: 0 })
                }
                if (oppLoki) {//UPDATING OPPONENT LOKI DECK COUNT ON DOM
                    this.setState({ oppLokiDeck: oppLoki.length })
                } else {
                    this.setState({ oppLokiDeck: 0 })
                }
                if (myHand) {//DISPLAYING HAND CARDS IN DOM
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

        //LISTENING FOR PLAYER READY DURING SETUP AND STARTING GAME - ALSO LISTENING FOR PLAYER RAGEQUIT
        database.ref(`/games/Game${props.gameId}/`).on('value', snap => {
            if (this.state.gameReady && !snap.val().world.gameRunning && snap.val().playerOne.ready && snap.val().playerTwo.ready) {
                this.gameStart()
            }
            if (this.state.gameRunning && !snap.val().playerTwo.active && this.state.isPlayer1) {//AWARDING PLAYER 1 VICTORY BY DEFAULT
                this.setState({ gameWinner: 'white' })
            } else if (this.state.gameRunning && !snap.val().playerOne.active && this.state.isPlayer2) {//AWARDING PLAYER 2 VICTORY BY DEFAULT
                this.setState({ gameWinner: 'black' })
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
        this.setState({ isPlayer1: true, cardsToDraw: 5, gameReady: true });

        // firebase.database().ref(`/games/Game${this.state.gameId}/playerOne`).once('value', snap => {
        //     console.log(snap.val().name)
        //     this.setState({ playerOneName: (snap.val().name) })
        // });

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

        // firebase.database().ref(`/games/Game${this.state.gameId}/playerTwo`).once('value', snap => {
        //     console.log(snap.val().name)
        //     this.setState({ playerTwoName: (snap.val().name) })
        //     console.log(this.state.playerOneName)
        // });

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
            player1LokiDeck: [5, 5, 8, 8, 7, 7, 6, 6],
            player2LokiDeck: [5, 5, 8, 8, 7, 7, 6, 6]
        }).then((snap) => {
            this.setState({ gameReady: true })
            console.log('game ready!')
        })
    };

    gameStart = () => {
        this.setState({ gameRunning: true })
        firebase.database().ref(`/games/Game${this.state.gameId}/world`).update({//INITIALIZING TURN SEQUENCE
            gameRunning: true,
            playerTurn: '1'
        })
    }

    handleCardPlay = cardId => {//PLAYER ATTEMPTING TO PLAY A CARD IN HAND
        if (this.state.gameRunning && this.state.myTurn && this.state.cardsToDraw === 0) { //CARD PLAY IS ALLOWED
            if (cardId < 5) {//CARD IS A LAND CARD
                if (this.state.isPlayer1) {//ROUTING TO PLAYER 1
                    firebase.database().ref(`/games/Game${this.state.gameId}/world/completerow`).once('value', snap => {
                        if (cardId === snap.val()[this.state.whiteRaven + 1]) {//EXECUTING FAST MOVE
                            for (let idx = this.state.whiteRaven + 1; idx < 33; idx++) {//LOOPING TO END OF MATCHING TERRAIN
                                if (idx === this.state.completerow.length) {//WHITE RAVEN REACHED THE END
                                    firebase.database().ref(`/games/Game${this.state.gameId}/world/`).update({//UPDATING RAVEN POSITION IN FIREBASE
                                        whiteRaven: this.state.completerow.length - 1,
                                        lastCardPlayed: cardId
                                    })
                                    break;
                                } else if (snap.val()[idx] !== cardId) {//MATCHING TERRAIN ENDS
                                    firebase.database().ref(`/games/Game${this.state.gameId}/world/`).update({//UPDATING RAVEN POSITION IN FIREBASE
                                        whiteRaven: idx - 1,
                                        lastCardPlayed: cardId
                                    })
                                    break;
                                }
                            }
                            firebase.database().ref(`/games/Game${this.state.gameId}/decks/player1Hand`).once('value', snap => {//REMOVING PLAYED CARD
                                let handCards = Object.values(snap.val())
                                let cutIdx = handCards.indexOf(cardId)
                                handCards.splice(cutIdx, 1)
                                firebase.database().ref(`/games/Game${this.state.gameId}/decks/`).update({
                                    player1Hand: handCards
                                })
                            })
                        } else {//CHECKING FOR SLOW MOVE
                            let counter = 0;
                            this.state.playerHand.forEach(val => {
                                if (val === cardId) { counter++ }
                            })
                            if (counter > 1) {//EXECUTING SLOW MOVE
                                if (snap.val()[this.state.whiteRaven + 1] === snap.val()[this.state.whiteRaven + 2]) {//STRETCH OF SIMILAR TERRAIN AHEAD
                                    for (let idx = this.state.whiteRaven + 2; idx < 33; idx++) {//LOOPING TO END OF MATCHING TERRAIN
                                        if (idx === this.state.completerow.length) {//WHITE RAVEN REACHED THE END
                                            firebase.database().ref(`/games/Game${this.state.gameId}/world/`).update({//UPDATING RAVEN POSITION IN FIREBASE
                                                whiteRaven: this.state.completerow.length - 1,
                                                lastCardPlayed: cardId
                                            })
                                            break;
                                        } else if (snap.val()[idx] !== snap.val()[idx - 1]) {//MATCHING TERRAIN ENDS
                                            firebase.database().ref(`/games/Game${this.state.gameId}/world/`).update({//UPDATING RAVEN POSITION IN FIREBASE
                                                whiteRaven: idx - 1,
                                                lastCardPlayed: cardId
                                            })
                                            break;
                                        }
                                    }
                                } else {
                                    firebase.database().ref(`/games/Game${this.state.gameId}/world/`).update({//UPDATING RAVEN POSITION IN FIREBASE
                                        whiteRaven: this.state.whiteRaven + 1,
                                        lastCardPlayed: cardId
                                    })
                                }
                                firebase.database().ref(`/games/Game${this.state.gameId}/decks/player1Hand`).once('value', snap => {//REMOVING PLAYED CARD
                                    let handCards = Object.values(snap.val());
                                    handCards.sort();
                                    let cutIdx = handCards.indexOf(cardId);
                                    handCards.splice(cutIdx, 2);
                                    firebase.database().ref(`/games/Game${this.state.gameId}/decks/`).update({
                                        player1Hand: handCards
                                    })
                                })
                            }
                        }
                    })
                } else if (this.state.isPlayer2) {//ROUTING TO PLAYER 2
                    firebase.database().ref(`/games/Game${this.state.gameId}/world/completerow`).once('value', snap => {
                        if (cardId === snap.val()[this.state.blackRaven - 1]) {//EXECUTING FAST MOVE
                            for (let idx = this.state.blackRaven - 1; idx > -2; idx--) {//LOOPING TO END OF MATCHING TERRAIN
                                if (idx === -1) {//BLACK RAVEN REACHED THE END
                                    firebase.database().ref(`/games/Game${this.state.gameId}/world/`).update({//UPDATING RAVEN POSITION IN FIREBASE
                                        blackRaven: 0,
                                        lastCardPlayed: cardId
                                    })
                                    break;
                                } else if (snap.val()[idx] !== cardId) {//MATCHING TERRAIN ENDS
                                    firebase.database().ref(`/games/Game${this.state.gameId}/world/`).update({//UPDATING RAVEN POSITION IN FIREBASE
                                        blackRaven: idx + 1,
                                        lastCardPlayed: cardId
                                    })
                                    break;
                                }
                            }
                            firebase.database().ref(`/games/Game${this.state.gameId}/decks/player2Hand`).once('value', snap => {//REMOVING PLAYED CARD
                                let handCards = Object.values(snap.val())
                                let cutIdx = handCards.indexOf(cardId)
                                handCards.splice(cutIdx, 1)
                                firebase.database().ref(`/games/Game${this.state.gameId}/decks/`).update({
                                    player2Hand: handCards
                                })
                            })
                        } else {
                            let counter = 0;
                            this.state.playerHand.forEach(val => {
                                if (val === cardId) { counter++ }
                            })
                            if (counter > 1) {//EXECUTING SLOW MOVE
                                if (snap.val()[this.state.blackRaven - 1] === snap.val()[this.state.blackRaven - 2]) {//STRETCH OF SIMILAR TERRAIN AHEAD
                                    for (let idx = this.state.blackRaven - 2; idx > -2; idx--) {//LOOPING TO END OF MATCHING TERRAIN
                                        if (idx === -1) {//BLACK RAVEN REACHED THE END
                                            firebase.database().ref(`/games/Game${this.state.gameId}/world/`).update({//UPDATING RAVEN POSITION IN FIREBASE
                                                blackRaven: 0,
                                                lastCardPlayed: cardId
                                            })
                                            break;
                                        } else if (snap.val()[idx] !== snap.val()[idx + 1]) {//MATCHING TERRAIN ENDS
                                            firebase.database().ref(`/games/Game${this.state.gameId}/world/`).update({//UPDATING RAVEN POSITION IN FIREBASE
                                                blackRaven: idx + 1,
                                                lastCardPlayed: cardId
                                            })
                                            break;
                                        }
                                    }
                                } else {
                                    firebase.database().ref(`/games/Game${this.state.gameId}/world/`).update({//UPDATING RAVEN POSITION IN FIREBASE
                                        blackRaven: this.state.blackRaven - 1,
                                        lastCardPlayed: cardId
                                    })
                                }
                                firebase.database().ref(`/games/Game${this.state.gameId}/decks/player2Hand`).once('value', snap => {//REMOVING PLAYED CARD
                                    let handCards = Object.values(snap.val());
                                    handCards.sort();
                                    let cutIdx = handCards.indexOf(cardId);
                                    handCards.splice(cutIdx, 2);
                                    firebase.database().ref(`/games/Game${this.state.gameId}/decks/`).update({
                                        player2Hand: handCards
                                    })
                                })
                            }
                        }
                    })
                }
            } else if (cardId === 5) {//SHOWING PUSH OPTION
                this.setState({ showingHand: false, showingPush: true })
            } else if (cardId === 6) {//ALLOWING DOUBLEDRAW
                this.doubleDraw();
                firebase.database().ref(`/games/Game${this.state.gameId}/world/`).update({ lastCardPlayed: 6 })
            } else if (cardId === 7) {//SHOWING FLIP/DESTROY OPTIONS
                this.setState({ showingHand: false, showingFlipOrDestroy: true })
            } else if (cardId === 8) {//SHOWING SWAP OPTIONS
                this.setState({ showingHand: false, showingSwap: true })
            }
        }
    }

    drawFlight = () => {//USER REQUESTING TO DRAW FLIGHT
        if (this.state.gameRunning || this.state.gameReady) {
            let newCard = Math.floor(Math.random() * 5)
            if (this.state.cardsToDraw > 1) {//PLAYER CAN KEEP DRAWING

                if (this.state.isPlayer1) {//ROUTING TO PLAYER 1 HAND
                    firebase.database().ref(`games/Game${this.state.gameId}/decks/player1Hand`).push(newCard)
                } else {//ROUTING TO PLAYER 2 HAND
                    firebase.database().ref(`games/Game${this.state.gameId}/decks/player2Hand`).push(newCard)
                }
                this.setState({ cardsToDraw: this.state.cardsToDraw - 1 });
            } else if (this.state.cardsToDraw === 1) {//PLAYER DONE DRAWING, SWITCHING GAME TURN
                if (this.state.isPlayer1) {//ROUTING TO PLAYER 1 HAND
                    firebase.database().ref(`games/Game${this.state.gameId}/decks/player1Hand`).push(newCard)
                } else {//ROUTING TO PLAYER 2 HAND
                    firebase.database().ref(`games/Game${this.state.gameId}/decks/player2Hand`).push(newCard)
                }
                this.setState({ cardsToDraw: 0 });
                if (!this.state.instaDrawing) { //NORMAL DRAW OVER, SWITCHING TURN
                    if (this.state.isPlayer1 && !this.state.gameRunning) {//FLAGGING PLAYER 1 READY TO START
                        firebase.database().ref(`games/Game${this.state.gameId}/playerOne/`).update({ ready: true })
                    } else if (this.state.isPlayer2 && !this.state.gameRunning) {//FLAGGING PLAYER 2 READY TO START
                        firebase.database().ref(`games/Game${this.state.gameId}/playerTwo/`).update({ ready: true })
                    } else if (this.state.isPlayer1 && this.state.gameRunning) {//HANDING ACTIVE TURN TO PLAYER 2
                        firebase.database().ref(`games/Game${this.state.gameId}/world/`).update({ playerTurn: '2' })
                    } else if (this.state.isPlayer2 && this.state.gameRunning) {//HANDING ACTIVE TURN TO PLAYER 2
                        firebase.database().ref(`games/Game${this.state.gameId}/world/`).update({ playerTurn: '1' })
                    }
                } else if (this.state.instaDrawing) {
                    this.setState({ instaDrawing: false })
                }
            }
        }
    };

    drawLoki = () => {//USER REQUESTING TO DRAW LOKI
        if (this.state.gameRunning || this.state.gameReady) {
            if (this.state.myLokiDeck > 0) {

                let newCard;

                if (this.state.cardsToDraw > 0) {
                    if (this.state.isPlayer1) {//ROUTING TO CHECK PLAYER 1 HAND
                        firebase.database().ref(`games/Game${this.state.gameId}/decks/player1LokiDeck`).once('value', snap => {
                            let myLoki = snap.val()
                            myLoki = Object.values(myLoki)
                            newCard = myLoki.splice([Math.floor(Math.random() * myLoki.length)], 1)[0]
                            firebase.database().ref(`games/Game${this.state.gameId}/decks/`).update({ player1LokiDeck: myLoki })
                        })
                    } else if (this.state.isPlayer2) {//ROUTING TO CHECK PLAYER 2 HAND
                        firebase.database().ref(`games/Game${this.state.gameId}/decks/player2LokiDeck`).once('value', snap => {
                            let myLoki = snap.val()
                            myLoki = Object.values(myLoki)
                            newCard = myLoki.splice([Math.floor(Math.random() * myLoki.length)], 1)[0]
                            firebase.database().ref(`games/Game${this.state.gameId}/decks/`).update({ player2LokiDeck: myLoki })
                        })
                    }
                }

                if (this.state.cardsToDraw > 1) {//PLAYER CAN KEEP DRAWING

                    if (this.state.isPlayer1) {//ROUTING TO PLAYER 1 HAND
                        firebase.database().ref(`games/Game${this.state.gameId}/decks/player1Hand`).push(newCard)
                    } else {//ROUTING TO PLAYER 2 HAND
                        firebase.database().ref(`games/Game${this.state.gameId}/decks/player2Hand`).push(newCard)
                    }
                    this.setState({ cardsToDraw: this.state.cardsToDraw - 1 });
                } else if (this.state.cardsToDraw === 1) {//PLAYER DONE DRAWING
                    if (this.state.isPlayer1) {//ROUTING TO PLAYER 1 HAND
                        firebase.database().ref(`games/Game${this.state.gameId}/decks/player1Hand`).push(newCard)
                    } else {//ROUTING TO PLAYER 2 HAND
                        firebase.database().ref(`games/Game${this.state.gameId}/decks/player2Hand`).push(newCard)
                    }
                    this.setState({ cardsToDraw: 0 });
                    if (!this.state.instaDrawing) { //NORMAL DRAW OVER, SWITCHING TURN
                        if (this.state.isPlayer1 && !this.state.gameRunning) {//FLAGGING PLAYER 1 READY TO START
                            firebase.database().ref(`games/Game${this.state.gameId}/playerOne/`).update({ ready: true })
                        } else if (this.state.isPlayer2 && !this.state.gameRunning) {//FLAGGING PLAYER 2 READY TO START
                            firebase.database().ref(`games/Game${this.state.gameId}/playerTwo/`).update({ ready: true })
                        } else if (this.state.isPlayer1 && this.state.gameRunning) {//HANDING ACTIVE TURN TO PLAYER 2
                            firebase.database().ref(`games/Game${this.state.gameId}/world/`).update({ playerTurn: '2' })
                        } else if (this.state.isPlayer2 && this.state.gameRunning) {//HANDING ACTIVE TURN TO PLAYER 2
                            firebase.database().ref(`games/Game${this.state.gameId}/world/`).update({ playerTurn: '1' })
                        }
                    } else if (this.state.instaDrawing) {
                        this.setState({ instaDrawing: false })
                    }
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
    };

    selfPush = () => {
        if (this.state.isPlayer1) {
            firebase.database().ref(`games/Game${this.state.gameId}/world`).update({ whiteRaven: this.state.whiteRaven + 1 })
            let myHand = this.state.playerHand
            let cutIdx = myHand.indexOf(5)
            myHand.splice(cutIdx, 1)
            firebase.database().ref(`games/Game${this.state.gameId}/decks`).update({ player1Hand: myHand })
        } else if (this.state.isPlayer2) {
            firebase.database().ref(`games/Game${this.state.gameId}/world`).update({ blackRaven: this.state.blackRaven - 1 })
            let myHand = this.state.playerHand
            let cutIdx = myHand.indexOf(5)
            myHand.splice(cutIdx, 1)
            firebase.database().ref(`games/Game${this.state.gameId}/decks`).update({ player2Hand: myHand })
        }
        this.setState({ showingHand: true, showingPush: false })
        firebase.database().ref(`/games/Game${this.state.gameId}/world/`).update({ lastCardPlayed: 5 })
    }

    oppPush = () => {
        if (this.state.isPlayer1 && this.state.blackRaven < this.state.completerow.length - 1) {
            firebase.database().ref(`games/Game${this.state.gameId}/world`).update({ blackRaven: this.state.blackRaven + 1 })
            let myHand = this.state.playerHand
            let cutIdx = myHand.indexOf(5)
            myHand.splice(cutIdx, 1)
            firebase.database().ref(`games/Game${this.state.gameId}/decks`).update({ player1Hand: myHand })
        } else if (this.state.isPlayer2 && this.state.whiteRaven > 0) {
            firebase.database().ref(`games/Game${this.state.gameId}/world`).update({ whiteRaven: this.state.whiteRaven - 1 })
            let myHand = this.state.playerHand
            let cutIdx = myHand.indexOf(5)
            myHand.splice(cutIdx, 1)
            firebase.database().ref(`games/Game${this.state.gameId}/decks`).update({ player2Hand: myHand })
        }
        this.setState({ showingHand: true, showingPush: false })
        firebase.database().ref(`/games/Game${this.state.gameId}/world/`).update({ lastCardPlayed: 5 })
    }

    doubleDraw = () => {
        let myHand = this.state.playerHand
        let cutIdx = myHand.indexOf(6)
        myHand.splice(cutIdx, 1)
        if (this.state.isPlayer1) {
            firebase.database().ref(`games/Game${this.state.gameId}/decks`).update({ player1Hand: myHand })
        } else if (this.state.isPlayer2) {
            firebase.database().ref(`games/Game${this.state.gameId}/decks`).update({ player2Hand: myHand })
        }
        this.setState({ showingDoubleTrouble: false, showingHand: true, instaDrawing: true, cardsToDraw: this.state.cardsToDraw + 2 })
    }

    // addLand = () => {
    //     this.setState({ showingDoubleTrouble: false, showingLandAdd: true })
    // }
    startingFlip = () => {
        this.setState({
            showingFlipOrDestroy: false,
            showingFlip: true
        })
    }

    startingDestroy = () => {
        this.setState({
            showingFlipOrDestroy: false,
            showingDestroy: true
        })
    }

    handleLandClick = (landIdx) => {
        if (landIdx > 15) {//SETTING INDEX VALUE FOR TOP ROW
            landIdx = this.state.completerow.length - 1 - landIdx
        }

        if (this.state.showingFlip) {//FLIP IS ALLOWED
            if (landIdx + this.state.whiteRaven !== this.state.completerow.length - 1 && landIdx + this.state.blackRaven !== this.state.completerow.length - 1 && landIdx !== this.state.whiteRaven && landIdx !== this.state.blackRaven) {//RAVENS ARE NOT ON THIS COLUMN
                let landPair = [this.state.completerow[landIdx], this.state.completerow[this.state.completerow.length - 1 - landIdx]]//GATHERING LANDTYPES

                let newWorld = this.state.completerow;//COPYING WORLD ARRAY FOR MODIFICATION
                //INPUTTING NEW LAND VALUES
                newWorld[landIdx] = landPair[1];
                newWorld[this.state.completerow.length - 1 - landIdx] = landPair[0];

                firebase.database().ref(`games/Game${this.state.gameId}/world`).update({
                    completerow: newWorld,
                    toprow: newWorld.slice(0, newWorld.length / 2),
                    bottomrow: newWorld.slice(newWorld.length / 2, newWorld.length).reverse(),
                })

                if (this.state.isPlayer1) {
                    let myHand = this.state.playerHand
                    let cutIdx = myHand.indexOf(7)
                    myHand.splice(cutIdx, 1)
                    firebase.database().ref(`games/Game${this.state.gameId}/decks`).update({ player1Hand: myHand })
                } else if (this.state.isPlayer2) {
                    let myHand = this.state.playerHand
                    let cutIdx = myHand.indexOf(7)
                    myHand.splice(cutIdx, 1)
                    firebase.database().ref(`games/Game${this.state.gameId}/decks`).update({ player2Hand: myHand })
                }
            }
            this.setState({ showingFlip: false, showingHand: true })//RESETTING DOM
            firebase.database().ref(`/games/Game${this.state.gameId}/world/`).update({ lastCardPlayed: 7 })
        } else if (this.state.showingSwap) {//SWAP IS ALLOWED
            if (landIdx + this.state.whiteRaven !== this.state.completerow.length - 1 && landIdx + this.state.blackRaven !== this.state.completerow.length - 1 && landIdx !== this.state.whiteRaven && landIdx !== this.state.blackRaven) {//RAVENS ARE NOT ON THIS COLUMN
                if (this.state.swapCards.length === 0 || this.state.swapCards.length === 2) {//STARTING SWAP PAIR
                    this.setState({ swapCards: [landIdx] })
                } else if (this.state.swapCards.length === 1 && landIdx === this.state.swapCards[0]) {//USER CHOOSING TO CANCEL ORIGINAL PICK
                    this.setState({ swapCards: [] })
                } else if (this.state.swapCards.length === 1 && landIdx !== this.state.swapCards[0]) {//PUSHING TO COMPLETE PAIR AND EXECUTING SWAP
                    let tempArr = this.state.swapCards
                    tempArr.push(landIdx)
                    this.setState({ swapCards: tempArr, showingSwap: false, showingHand: true })//RESETTING DOM
                    firebase.database().ref(`/games/Game${this.state.gameId}/world/`).update({ lastCardPlayed: 8 })
                    //GATHERING ALL INVOLVED LANDTYPES AND INDICES
                    let landPairWithIndex1 = [this.state.completerow[this.state.swapCards[0]], this.state.completerow[this.state.completerow.length - 1 - this.state.swapCards[0]], this.state.swapCards[0]]
                    let landPairWithIndex2 = [this.state.completerow[this.state.swapCards[1]], this.state.completerow[this.state.completerow.length - 1 - this.state.swapCards[1]], this.state.swapCards[1]]

                    let newWorld = this.state.completerow;//COPYING WORLD ARRAY FOR MODIFICATION
                    //INPUTTING NEW LAND VALUES
                    newWorld[landPairWithIndex2[2]] = landPairWithIndex1[0];
                    newWorld[this.state.completerow.length - 1 - landPairWithIndex2[2]] = landPairWithIndex1[1];
                    newWorld[landPairWithIndex1[2]] = landPairWithIndex2[0];
                    newWorld[this.state.completerow.length - 1 - landPairWithIndex1[2]] = landPairWithIndex2[1];

                    firebase.database().ref(`games/Game${this.state.gameId}/world`).update({
                        completerow: newWorld,
                        toprow: newWorld.slice(0, newWorld.length / 2),
                        bottomrow: newWorld.slice(newWorld.length / 2, newWorld.length).reverse(),
                    })

                    if (this.state.isPlayer1) {
                        let myHand = this.state.playerHand
                        let cutIdx = myHand.indexOf(8)
                        myHand.splice(cutIdx, 1)
                        firebase.database().ref(`games/Game${this.state.gameId}/decks`).update({ player1Hand: myHand })
                    } else if (this.state.isPlayer2) {
                        let myHand = this.state.playerHand
                        let cutIdx = myHand.indexOf(8)
                        myHand.splice(cutIdx, 1)
                        firebase.database().ref(`games/Game${this.state.gameId}/decks`).update({ player2Hand: myHand })
                    }
                }
            }
        } else if (this.state.showingDestroy) { //DESTROY IS ALLOWED
            if (landIdx + this.state.whiteRaven !== this.state.completerow.length - 1 && landIdx + this.state.blackRaven !== this.state.completerow.length - 1 && landIdx !== this.state.whiteRaven && landIdx !== this.state.blackRaven) {//RAVENS ARE NOT ON THIS COLUMN
                if (landIdx < this.state.whiteRaven && this.state.completerow.length - 1 - landIdx < this.state.whiteRaven) {//WHITE IS PAST BOTH COLUMN INDICES
                    firebase.database().ref(`games/Game${this.state.gameId}/world`).update({ whiteRaven: this.state.whiteRaven - 2 })
                } else if (landIdx < this.state.whiteRaven && this.state.completerow.length - 1 - landIdx > this.state.whiteRaven) {//WHITE IS BETWEEN COLUMN INDICES
                    firebase.database().ref(`games/Game${this.state.gameId}/world`).update({ whiteRaven: this.state.whiteRaven - 1 })
                }

                if (landIdx < this.state.blackRaven && this.state.completerow.length - 1 - landIdx < this.state.blackRaven) {//BLACK IS PAST BOTH COLUMN INDICES
                    firebase.database().ref(`games/Game${this.state.gameId}/world`).update({ blackRaven: this.state.blackRaven - 2 })
                } else if (landIdx < this.state.blackRaven && this.state.completerow.length - 1 - landIdx > this.state.blackRaven) {//BLACK IS BETWEEN COLUMN INDICES
                    firebase.database().ref(`games/Game${this.state.gameId}/world`).update({ blackRaven: this.state.blackRaven - 1 })
                }

                let wholeWorld = this.state.completerow
                wholeWorld.splice(this.state.completerow.length - 1 - landIdx, 1) //REMOVING BOTTOM LAND FROM ARRAY
                wholeWorld.splice(landIdx, 1) //REMOVING TOP LAND FROM ARRAY
                firebase.database().ref(`games/Game${this.state.gameId}/world`).update({
                    completerow: wholeWorld,
                    toprow: wholeWorld.slice(0, wholeWorld.length / 2),
                    bottomrow: wholeWorld.slice(wholeWorld.length / 2, wholeWorld.length).reverse()
                })

                if (this.state.isPlayer1) {
                    let myHand = this.state.playerHand
                    let cutIdx = myHand.indexOf(7)
                    myHand.splice(cutIdx, 1)
                    firebase.database().ref(`games/Game${this.state.gameId}/decks`).update({ player1Hand: myHand })
                } else if (this.state.isPlayer2) {
                    let myHand = this.state.playerHand
                    let cutIdx = myHand.indexOf(7)
                    myHand.splice(cutIdx, 1)
                    firebase.database().ref(`games/Game${this.state.gameId}/decks`).update({ player2Hand: myHand })
                }
                this.setState({ showingDestroy: false, showingHand: true })
                firebase.database().ref(`/games/Game${this.state.gameId}/world/`).update({ lastCardPlayed: 7 })
            }
        }
    }

    //Julien https://github.com/jerauld/ was here for the BGM
    handleAudioToggle = () => {
        var bgm = document.getElementById('bgm');
        this.setState(prevState => ({
            audioToggle: !prevState.audioToggle
        }));
        if (this.state.audioToggle) {
            bgm.pause();
        } else {
            bgm.play();
        }
        // alert(this.state.audioToggle);
    }

    render() {
        let player;
        if (this.state.isPlayer1) {
            player = "white"
        } else {
            player = "black"
        }
        return (

            <Container fluid>

                <div className="row info-background game-status-margin">
                    <Col size="md-4">
                        <div className="game-status-box text-center">

                            <div>
                                <img className="coin-size" alt="ravenCoin" src={require('../../components/Images/coin-1.png')}/>
                                <h3 className="d-flex justify-content-left" id="gameBarText">White Raven : {this.state.playerOneName}</h3>
                                {/* <img src={require('../../components/Images/line-2.png')} /> */}
                                {/* <h3 className="d-flex justify-content-center" id="gameBarText"></h3> */}
                            </div>
                            <hr className="justify-content-left gameHr" />
                            <div>
                                <img className="coin-size" alt="ravenCoin" src={require('../../components/Images/coin-2.png')} />
                                <h3 className="d-flex justify-content-left" id="gameBarText">Dark Raven : {this.state.playerTwoName}</h3>
                                {/* <h3 className="d-flex justify-content-center" id="gameBarText"></h3> */}
                            </div>
                        </div>
                    </Col>

                    <Col size="md-4">
                        <div className="game-status-box d-flex justify-content-center text-center">

                            {this.state.myTurn && this.state.cardsToDraw === 0 && this.state.gameWinner === null ?
                                <div id="youPlay">
                                    <h3 className="d-flex justify-content-center rounded yourTurn" id="gameBarText">Your turn: Play Cards</h3>
                                    <hr className="gameHr" />
                                    <h3 className="d-flex justify-content-center rounded yourTurn" id="gameBarText">Click Flight Cards from your hand to move</h3>
                                </div> : null}

                            {this.state.myTurn && this.state.cardsToDraw > 0 && this.state.gameWinner === null ?
                                <div id="youPlay">
                                    <h3 className="d-flex justify-content-center rounded yourTurn" id="gameBarText">Your turn: Draw Cards </h3>

                                    <hr className="gameHr" />
                                    <h3 className="d-flex justify-content-center rounded yourTurn" id="gameBarText">Cards to draw: <span className="cardsToDrawNum">&nbsp;{this.state.cardsToDraw}</span></h3>
                                </div> : null}

                            {!this.state.myTurn && this.state.gameWinner === null && this.state.gameRunning ?
                                <div>
                                    <h3 className="d-flex justify-content-center waitTurn" id="gameBarText">Waiting: Opponent's Turn</h3>
                                    <hr className="gameHr" />
                                </div> : null}
                            {!this.state.gameRunning && !this.state.gameWinner ?
                                <div id="youPlay">
                                    <h3 className="d-flex justify-content-center" id="gameBarText">World Generated</h3>
                                    <hr className="gameHr" />
                                    <h3 className="d-flex justify-content-center rounded yourTurn" id="gameBarText">Cards to draw: <span className="cardsToDrawNum">&nbsp;{this.state.cardsToDraw}</span></h3>
                                </div>
                                : null}
                            {this.state.gameWinner !== null ? <Modal playerNum={player} gameResult={this.state.gameWinner} /> : null}
                            {/* {this.state.gameWinner === 'white' && this.state.isPlayer2 ? <h3 className="d-flex justify-content-center">Defeat</h3> : null}
                            {this.state.gameWinner === 'black' && this.state.isPlayer1 ? <h3 className="d-flex justify-content-center">Defeat</h3> : null}
                            {this.state.gameWinner === 'black' && this.state.isPlayer2 ? <h3 className="d-flex justify-content-center">Victorious</h3> : null} */}
                        </div>
                    </Col>
                    <Col size="md-3">
                        {this.state.showingPush || this.state.showingFlipOrDestroy || this.state.showingSwap || this.state.showingFlip || this.state.showingDestroy ?
                            <div></div>
                            : <div className="game-status-box d-flex justify-content-right text-center">
                                {this.state.isPlayer1 && this.state.myTurn && this.state.cardsToDraw === 0 && this.state.gameWinner === null ? <h3 className="d-flex justify-content-center"><EndTurnButton buttonClick={this.endTurnClick} /></h3> : null}
                                {this.state.isPlayer2 && this.state.myTurn && this.state.cardsToDraw === 0 && this.state.gameWinner === null ? <h3 className="d-flex justify-content-center"><EndTurnButton buttonClick={this.endTurnClick} /></h3> : null}
                                {this.state.gameWinner !== null ? <a type="btn" className="btn button pr-4 pl-4 returnLobbyButton button-back-lobb" href="/lobby/">Back to Lobby</a> : null}
                            </div>}
                    </Col>
                    <Col size="md-1">
                        <audio
                            src={require("./vanaheim.mp3")}
                            type="audio/mp3"
                            autoPlay="autoplay"
                            loop="true"
                            id="bgm"
                        />
                        <div className="music-checkbox-button">
                            <input type="checkbox" id="cbx" onChange={this.handleAudioToggle} />
                            <label for="cbx" className="toggle"><span><i className="fas fa-music"></i></span></label>
                        </div>
                    </Col>
                </div>
                <Row>
                    <Col size="md-12">
                        <Jumbotron>
                            <div className="landBoard text-center">
                                <div className="">
                                    {this.state.toprow.map((landId, idx) => (
                                        <LandCard
                                            position={idx}
                                            key={idx}
                                            image={landId}
                                            whiteRaven={this.state.whiteRaven}
                                            blackRaven={this.state.blackRaven}
                                            landClick={this.handleLandClick}
                                        />
                                    ))}
                                </div>
                                <div className="img-vert">
                                    {this.state.bottomrow.map((landId, idx) => (
                                        <LandCard
                                            position={this.state.completerow.length - 1 - idx}
                                            key={idx}
                                            image={landId}
                                            whiteRaven={this.state.whiteRaven}
                                            blackRaven={this.state.blackRaven}
                                            landClick={this.handleLandClick}
                                        />
                                    ))}
                                </div>
                            </div>
                        </Jumbotron>
                    </Col>
                </Row>
                <Row>
                    <Col size="md-12">
                        <div className="userBoard text-center">
                            <Row>
                                <div className="col-md-2 text-yellow">
                                    <h3 className="text-yellow mb-2" id="h3Hands">Your Deck</h3>
                                    <div className="col-sm-6 text-yellow float-left">

                                        {this.state.myLokiDeck > 0 ? <DrawLoki deckClick={this.drawLoki} /> : null}
                                        {this.state.myLokiDeck === 0 ?
                                            <img
                                                className="emptyLokiDeck shakeCard"
                                                alt="Draw Loki"
                                                src="https://res.cloudinary.com/mosjoandy/image/upload/v1530297890/OdinsRavensLandCards/card-15.png" />
                                            : null}

                                        <p className="mt-2" id="h3Hands">Loki &#40;{this.state.myLokiDeck}/8&#41;</p>
                                    </div>
                                    <div className="col-sm-6 text-yellow float-right">
                                        <DrawFlight deckClick={this.drawFlight} />

                                        <p className="mt-2" id="h3Hands">Flight</p>
                                    </div>
                                </div>
                                {this.state.showingHand ?
                                    <div className="col-sm-6 text-yellow">
                                        <h3 className="pb-2" id="h3Hands">Your Hand ({this.state.playerHand.length}/7)</h3>
                                        {this.state.playerHand.map((landId, idx) => (
                                            <FlightCard
                                                key={idx}
                                                image={landId}
                                                cardClick={this.handleCardPlay}
                                            />
                                        ))}
                                    </div>
                                    : null}

                                {this.state.showingPush ?
                                    <div className="col-sm-6 text-yellow">
                                        <h4 className="mb-2" id="h3Hands">Whom do you want to push?</h4>
                                        <div>
                                            <button type="button" className="button btn pt-4 pb-4 mr-1 ravenPush" onClick={this.oppPush}>Push Opponent Backwards</button>
                                            <img alt="lokiPush" id="lokiChoices" src="https://res.cloudinary.com/mosjoandy/image/upload/v1530300322/cards-2-09.png" />
                                            <button type="button" className="button btn pt-4 pb-4 ml-1 ravenPush" onClick={this.selfPush}>Push My Raven Forwards</button>
                                        </div>
                                    </div>
                                    : null}
                                {this.state.showingFlipOrDestroy ?
                                    <div className="col-sm-6 text-yellow">
                                        <h4 className="mb-2" id="h3Hands">What do you want to do?</h4>
                                        <div>
                                            <button type="button" className="button btn pt-4 pb-4 mr-1 ravenPush" onClick={this.startingFlip}>Flip a Land Column</button>
                                            <img alt="lokiFlipDestroy" id="lokiChoices" src="https://res.cloudinary.com/mosjoandy/image/upload/v1530300322/cards-2-07.png" />
                                            <button type="button" className="button btn pt-4 pb-4 ml-1 ravenPush" onClick={this.startingDestroy}>Destroy a Land Column</button>
                                        </div>
                                    </div>
                                    : null}
                                {this.state.showingSwap ?
                                    <div className="col-sm-6 text-yellow">
                                        <h4 className="yourTurn" id="h3Hands">Please click the two Land Cards you want to <span className="swapCard rounded">swap</span></h4>
                                        <h4 className="mb-2" id="h3Hands">(may NOT contain Ravens)</h4>
                                        <img alt="lokiSwap" id="lokiChoices" className="mr-3" src="https://res.cloudinary.com/mosjoandy/image/upload/v1531275974/card-16C.png" />
                                        <img alt="lokiSwap" width="200px" className="lokiSwapGif rounded" src="https://res.cloudinary.com/mosjoandy/image/upload/v1531276049/LokiSwapGIF.gif" />
                                    </div>
                                    : null}
                                {this.state.showingFlip ?
                                    <div className="col-sm-6 text-yellow">
                                        <h4 className="yourTurn" id="h3Hands">Please click the Land Card you want to <span className="swapCard rounded">flip</span></h4>
                                        <h4 className="mb-2" id="h3Hands">(may NOT contain Ravens)</h4>
                                        <img alt="lokiFlip" id="lokiChoices" className="mr-3" src="https://res.cloudinary.com/mosjoandy/image/upload/v1531275974/card-17C.png" />
                                        <img alt="lokiFlip" width="200px" className="lokiFlipGif rounded" src="https://res.cloudinary.com/mosjoandy/image/upload/v1531280104/LokiFlipGifB.gif" />
                                    </div>
                                    : null}
                                {this.state.showingDestroy ?
                                    <div className="col-sm-6 text-yellow">
                                        <h4 className="yourTurn" id="h3Hands">Please click the land column you want to <span className="swapCard rounded">destroy</span></h4>
                                        <h4 className="mb-2" id="h3Hands">(may NOT contain Ravens)</h4>
                                        <img alt="lokiFlip" id="lokiChoices" className="mr-3" src="https://res.cloudinary.com/mosjoandy/image/upload/v1531275974/card-17C.png" />
                                        <img alt="lokiDestroy" width="200px" className="lokiDestroyGif rounded" src="https://res.cloudinary.com/mosjoandy/image/upload/v1534136815/LokiDestroyGif.gif" />
                                    </div>
                                    : null}
                                <div className="col-md-2 text-yellow">
                                    <h3 className="text-yellow mb-2" id="h3Hands">Opponent's hand</h3>

                                    <div className="col-md-6 text-yellow float-left">
                                        <img className="opponentCardDeck shakeCard" alt="rivalDeckCard" src="https://res.cloudinary.com/mosjoandy/image/upload/v1531349867/opponent-hand.png" />
                                        <p className="mt-2" id="h3Hands">Cards: {this.state.opponentHand}</p>
                                    </div>

                                    <div className="col-md-6 text-yellow float-right">
                                        <img className="opponentLokiDeck shakeCard" alt="rivalDeckLoki" src="https://res.cloudinary.com/mosjoandy/image/upload/v1530297890/OdinsRavensLandCards/card-12.png" />
                                        <p className="mt-2" id="h3Hands">Loki &#40;{this.state.oppLokiDeck}/8&#41;</p>
                                    </div>
                                </div>

                                <div className="col-md-2 text-yellow">
                                    <h3 className="text-yellow mb-2" id="h3Hands">Last card played</h3>

                                    {this.state.lastCardPlayed || this.state.lastCardPlayed === 0 ?
                                        <FlightCard
                                            image={this.state.lastCardPlayed}
                                        />
                                        : null}
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
