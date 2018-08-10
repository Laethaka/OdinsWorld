import React, { Component } from "react";
import { Col, Container } from "../../components/Grid";
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
                <div className="lobby-row row row-margin d-flex justify-content-between">
                    <Col size="lg-2">
                        {/* Users Online Component */}
                        <div className="box info-background users-box">
                            <h2 className="lobby-subtitle">Users</h2>
                            <img className="h1-img-top" alt="breakLine" src={require('../../components/Images/h1.png')} />
                                <LobbyUsers
                                    users={this.state.usersInLobby} />
                            <img className="h1-img-bottom" alt="breakLine" src={require('../../components/Images/h1.png')} />
                            
                        </div>
                    </Col>

                    <Col size="lg-5">
                        {/* Lobby Chat Component */}
                        <div className="box info-background chats-box">           
                            <h2 className="lobby-subtitle">Chat</h2>
                            <img className="h1-img-top" alt="breakLine" src={require('../../components/Images/h1.png')} />
                                <Chat />
                            <img className="h1-img-bottom" alt="breakLine" src={require('../../components/Images/h1.png')} />
                        </div>
                    </Col>
    
                    <Col size="lg-4">
                        {/* Game Join Component */}
                        <div className="box info-background games-box">
                            <h2 className="lobby-subtitle">Games</h2>
                            <img  className="h1-img-top" alt="breakLine" src={require('../../components/Images/h1.png')} />
                                <div className="games-data">
                                    {this.state.usersInGame.map((playersArr, idx) => (
                                        <LobbyGame
                                            id={idx}
                                            key={idx}
                                            players={playersArr}
                                        />
                                    ))}
                                    
                                </div>
                            <img className="h1-img-bottom" alt="breakLine" src={require('../../components/Images/h1.png')} />
                        </div>
                    </Col>

                </div>
            </Container>
        )
    }
}

export default Lobby;