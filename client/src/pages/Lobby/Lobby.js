import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import "./Lobby.css";

import firebase from '../../firebase.js'

//Page components
import LobbyGames from "../../components/LobbyGames";
import LobbyUsers from "../../components/LobbyUsers";
import Chat from "../../components/Chat";

class Lobby extends Component {

    constructor() {
        super();
        this.state = {
            usersInLobby: [],
            usersInGame: [],
            message: ""
        };
        // this.handleCreate = this.handleCreate.bind(this);

    };

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
            let usersArr = Object.values(snap.val());
            this.setState({ usersInLobby: usersArr });
        });

        database.ref(`/games`).on('value', snap => {
            // console.log('games:',snap.val())
            if (snap.val() != null) {
                let gamesArr = Object.values(snap.val());
                this.setState({usersInGame : gamesArr});
                console.log('gamesAvail:', gamesArr);
                // console.log('first game :', gamesAvail.Game1)
            };
            // this.setState({gameCount: gamesArr.length})
        });
    };

    handleCreate = () => {
        console.log(this.state.gameCount);
        this.state.gameCount++;
        let newGameId = this.state.gameCount;
        console.log(newGameId);
        // database.ref()
    };

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="lg-4">
                        {/* Game Join Component */}
                        <div className="box">
                            <LobbyGames 
                                games={this.state.usersInGame}
                            />
                            <button onClick={this.handleCreate}>Join Game</button>
                        </div>
                    </Col>

                    <Col size="lg-5">
                        {/* Lobby Chat Component */}
                        <div className="box">
                            <Chat />
                        </div>
                    </Col>

                    <Col size="xl-2">
                        {/* Users Online Component */}
                        <div className="box">
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
