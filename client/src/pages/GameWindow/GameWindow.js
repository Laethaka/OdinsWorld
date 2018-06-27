import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import "./GameWindow.css";
import FlightPathCard from "../../components/FlightPathCard";
import flightcards from "../../components/FlightPathCard/flightcards.json";

class GameWindow extends Component {

    state = {
        flightcards
    };

    gameStart = id => {
    const randoflightcards = [];

        for (let i = 0; i < 8; i ++) {
            randoflightcards.push(this.state.flightcards.splice
                
                (Math.floor(Math.random()*this.state.flightcards.length), 1 )[0]
            );

        };
    };

    render() {
        return (
        <Container fluid>
            <Row>
                <Col size="md-12">
                    <Jumbotron>
                        <div className="text-light border border-warning">
                        {this.state.flightcards.map(fpcards => (
                            <FlightPathCard
                            id={fpcards.id}
                            key={fpcards.id}
                            image={fpcards.image}
                            />
                        ))}
                        </div>
                    </Jumbotron>
                </Col>
            </Row>
        </Container>
        )
    }

};

export default GameWindow;
