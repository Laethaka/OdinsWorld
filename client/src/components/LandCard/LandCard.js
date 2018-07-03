import React from "react";
import "./LandCard.css";
import landcard from './landcard.json';

const LandCard = props => (
    <img width="100" alt={props.id} src={landcard[0].image} />
);

export default LandCard;
