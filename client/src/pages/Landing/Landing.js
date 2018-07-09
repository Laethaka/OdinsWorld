import React from "react";
import { Col, Row, Container } from "../../components/Grid";
import RuleBook from "../../components/RuleBook";
import "./Landing.css";

const Landing = (props) => (
    // <div className="landing-background">  
    <Container fluid> 
      <Row>
        <Col size="md-12">
            <RuleBook />
            
        </Col>
      </Row>
   
    </Container>
    // </div>
);

export default Landing;
