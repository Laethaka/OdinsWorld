import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import "./Lobby.css";
import LobbyChat from "../../components/LobbyChat";
import LobbyGames from "../../components/LobbyGames";
import LobbyUsers from "../../components/LobbyUsers";
import firebase from '../../firebase.js'

class Lobby extends Component {
    state = {
        usersInLobby: []
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

        connectionsRef.on("value", snap => {
            let usersArr = Object.values(snap.val())

            this.setState({usersInLobby: usersArr})
        })
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-5">
                        {/* Game Join Component */}
                        <div className="wholeSheBang">
                            <LobbyGames />
                        </div>
                    </Col>

                    <Col size="md-5">
                        {/* Lobby Chat Component */}
                        <div className="wholeSheBang">
                            <LobbyChat />
                        </div>
                    </Col>

                    <Col size="md-2">
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
