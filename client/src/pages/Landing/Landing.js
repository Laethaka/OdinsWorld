import React from "react";
import { Col, Row, Container } from "../../components/Grid";
import RuleBook from "../../components/RuleBook";
import "./Landing.css";

const Landing = () => (
    // <div className="landing-background">  
    <Container fluid> 
      <Row>
        <Col size="md-12">
            <RuleBook />
            
        </Col>
      </Row>
      {/* <Row className="d-flex justify-content-center">
        <button className="btn button" href="#" target="_blank">Lobby</button>   
      </Row> */}
      
    </Container>
    // </div>
);

export default Landing;
