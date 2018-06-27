import React from "react";
import { Col, Row, Container } from "../../components/Grid";
import "./FlightPathCard.css";

const FlightPathCard = props => (
    <img width="100" alt={props.id} src={props.image} />
);

export default FlightPathCard;
