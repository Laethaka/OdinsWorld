import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import "./GameWindow.css";
import LandCard from "../../components/LandCard";
import landcard from "../../components/LandCard/landcard.json";

class GameWindow extends Component {

    state = {
        landcard
    };

    // gameStart = id => {
    // const randolandcard = [];

    //     for (let i = 0; i < 8; i ++) {
    //         randolandcard.push(this.state.landcard.splice
                
    //             (Math.floor(Math.random()*this.state.landcard.length), 1 )[0]
    //         );

    //     };
    // };

    render() {
        return (
        <Container fluid>
            <Row>
                <Col size="md-12">
                    <Jumbotron>
                        <div className="text-light border border-warning">
                        {this.state.landcard.map(land => (
                            <LandCard
                            id={land.id}
                            key={land.id}
                            image={land.image}
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
