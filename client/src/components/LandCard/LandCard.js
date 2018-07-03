import React from "react";
import "./LandCard.css";

const LandCard = props => (
    <img width="100em" alt={props.id} src={props.image} />
);

export default LandCard;
