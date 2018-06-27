import React from "react";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import Registration from "../../components/Registration";
import "./Landing.css";

const Landing = () => (

    <Container fluid>
      <Row>
        <Col size="md-12">
            <Registration/>
        </Col>
      </Row>
    </Container>
);

export default Landing;
