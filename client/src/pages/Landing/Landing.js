import React from "react";
import { Col, Row, Container } from "../../components/Grid";
import Registration from "../../components/Registration";
import Login from "../../components/Login";
import "./Landing.css";

const Landing = () => (

    <Container fluid>
      <Row>
        <Login/>
      </Row>
      <Row>
        <Col size="md-12">
            <Registration/>
        </Col>
      </Row>
    </Container>
);

export default Landing;
