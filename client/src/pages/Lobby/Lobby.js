import React from "react";
import { Col, Row, Container } from "../../components/Grid";
import "./Lobby.css";
import LobbyChat from "../../components/LobbyChat";
import LobbyGames from "../../components/LobbyGames";
import LobbyUsers from "../../components/LobbyUsers";

const Lobby = () => (

    <Container fluid>
        <Row>
            <Col size="md-5">
                {/* Game Join Component */}
                <div className="wholeSheBang">
                    <LobbyGames />
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
                    <LobbyUsers />
                </div>
            </Col>
        </Row>
    </Container>
);

export default Lobby;
