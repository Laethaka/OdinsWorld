import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import "./Lobby.css";
import LobbyChat from "../../components/LobbyChat";
import LobbyGames from "../../components/LobbyGames";
import LobbyUsers from "../../components/LobbyUsers";
import firebase from '../../firebase.js'

class Lobby extends Component {
    state = {
        usersInLobby: [],
        gameCount: 0,
        activeGames: []
    }

    componentWillReceiveProps() {
        const database = firebase.database();
        const username = firebase.auth().currentUser.displayName;

        //CONNECTION LISTENER
        var connectionsRef = database.ref("/LobbyConnections");
        var connectedRef = database.ref(".info/connected");
        connectedRef.on("value", snap => {
            if (snap.val()) {
                var con = connectionsRef.push(username);
                con.onDisconnect().remove();
            }
        });
        connectionsRef.on("value", snap => {//PLAYERS IN LOBBY CHANGED
            //UPDATING PLAYERS LIST IN ON DOM
            let usersArr = Object.values(snap.val())
            this.setState({usersInLobby: usersArr})
        })

        database.ref(`/games`).on('value', snap => {
            // console.log('games:',snap.val())
            if (snap.val() != null) {
                let gamesAvail = snap.val()
                console.log('gamesAvail:', gamesAvail)
                console.log('first game :', gamesAvail.Game1)
                this.setState({gameCount: gamesAvail.length})
            }
            // this.setState({gameCount: gamesArr.length})
        })
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-5">
                        {/* Game Join Component */}
                        <div className="wholeSheBang">
                            There are currently {this.state.gameCount} games being hosted!
                            <LobbyGames />
                            <button>Create Game</button>
                        </div>
                    </Col>

                    <Col size="md-4">
                        {/* Lobby Chat Component */}
                        <div className="wholeSheBang">
                            <LobbyChat />
                        </div>
                    </Col>

                    <Col size="md-3">
                        {/* Users Online Component */}
                        <div className="wholeSheBang">
                            <LobbyUsers
                            users={this.state.usersInLobby}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Lobby;
