import React from "react";
import { Col, Row, Container } from "../../components/Grid";
import Welcome from "../../components/Welcome";
import "./Landing.css";

const Landing = () => (

    <Container fluid>
      <Row>
        <Col size="md-7">
        </Col>
        <Col size="md-5">
            <div className="welcome-box">
            <Welcome />
          </div>
          
        </Col>

      </Row>
    </Container>
);

export default Landing;
