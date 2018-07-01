import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import "./Lobby.css";


// import LobbyChat from "../../components/LobbyChat";
import LobbyGames from "../../components/LobbyGames";
import LobbyUsers from "../../components/LobbyUsers";

// Chat
import Chat from "../../components/Chat";
import { FormBtn, TextArea } from "../../components/Form";

import firebase from '../../firebase.js'

class Lobby extends Component {
    state = {
        usersInLobby: [],
        message: ""
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
    
    //////////////////////////////////////////////////////////////
    //Chat component

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
      };
    
    handleFormSubmit = event => {
    event.preventDefault();

    this.setState({
        message: ""
    })

    if (this.state.message) {
        console.log("pooping")
        // Firebase ish here
    //    ({
    //     message: this.state.messagea,
    //     })
    //     .then(res => console.log("poop success"))
    //     .catch(err => console.log(err));
    }

    };

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-4">
                        {/* Game Join Component */}
                        <div className="box">
                            <LobbyGames />
                        </div>
                    </Col>

                    <Col size="md-5">
                        {/* Lobby Chat Component */}
                        <div className="box">

                            <div className="row">
                                <Chat />
                            </div>

                            <div className="row">
                            
                                <TextArea 
                                    value={this.state.message}
                                    onChange={this.handleInputChange}
                                    name="message"
                                    placeholder="Send to lobby"
                                />
                                <FormBtn
                                    onClick={this.handleFormSubmit}
                                    onSubmit={this.handleFormSubmit.bind(this)}
                                >
                                    Send Poop
                                </FormBtn>
                            </div>

                        </div>
                    </Col>

                    <Col size="md-2">
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
