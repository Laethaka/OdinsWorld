import React from "react";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";

const Login = () => (
  <Container fluid>
    <Row>
      <Col size="md-12">
        <Jumbotron>
          <h1>Login Page!</h1>
        </Jumbotron>
      </Col>
    </Row>
  </Container>
);

export default Login;
