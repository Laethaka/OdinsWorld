import React from "react";
import "./FlightCard.css";
import flightcard from './flightcard.json';

function FlightCard (props) {
    switch(props.image) {
        case 0:
            return <img width="75rem" alt={flightcard[0].imageName} src={flightcard[0].image} />
        case 1:
            return <img width="75rem" alt={flightcard[1].imageName} src={flightcard[1].image} />
        case 2:
            return <img width="75rem" alt={flightcard[2].imageName} src={flightcard[2].image} />
        case 3:
            return <img width="75rem" alt={flightcard[3].imageName} src={flightcard[3].image} />
        case 4:
            return <img width="75rem" alt={flightcard[4].imageName} src={flightcard[4].image} />
    }
};

export default FlightCard;
