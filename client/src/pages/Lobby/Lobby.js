import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import "./Lobby.css";

import firebase from '../../firebase.js'

//Page components
import LobbyGame from "../../components/LobbyGame";
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
            let playersArr = [];
            if (snap.val()) {
                let gamesArr = Object.values(snap.val());
                gamesArr.forEach(ele => {
                    playersArr.push([ele.playerOne.name, ele.playerTwo.name])
                })
            };
            this.setState({ usersInGame: playersArr })
        });
    };

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="lg-4">
                        {/* Game Join Component */}
                        <div className="box">
                            <div className="games-box">
                            <h3 className="games-title">Games</h3>
                            <hr className="style-one" />
                                <div className="gamesData">
                                    {this.state.usersInGame.map((playersArr, idx) => (
                                        <LobbyGame
                                            id={idx}
                                            key={idx}
                                            players={playersArr}
                                        />
                                    ))}
                                </div>
                            </div>
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