import React from "react";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import './NoMatch.css';

const NoMatch = () => (
  <Container fluid>
    <Row>
      <Col size="md-12">
        <div className="noMatchPoop">
          <Jumbotron>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <h1 className="text-center">404 Page Not Found</h1>
          </Jumbotron>
        </div>
      </Col>
    </Row>
  </Container>
);

export default NoMatch;
