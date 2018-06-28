import React from "react";
import { Col, Row, Container } from "../../components/Grid";
import "./LandCard.css";

const LandCard = props => (
    <img width="100" alt={props.id} src={props.image} />
);

export default LandCard;
