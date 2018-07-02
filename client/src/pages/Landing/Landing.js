import React from "react";
import { Col, Row, Container } from "../../components/Grid";
import Welcome from "../../components/Welcome";
import "./Landing.css";

const Landing = () => (
    // <div className="landing-background">  
    <Container fluid> 
      <Row>
        <Col size="md-6">
        </Col>
        <Col size="md-6">
            <Welcome />     
        </Col>

      </Row>
    </Container>
    // </div>
);

export default Landing;
