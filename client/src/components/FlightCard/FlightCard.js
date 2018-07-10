import React from "react";
import "./FlightCard.css";
import flightcard from './flightcard.json';

function FlightCard(props) {
    switch (props.image) {
        case 0:
            return <img
                className="flightCardHand"
                alt={flightcard[0].imageName}
                src={flightcard[0].image}
                onClick={() => props.cardClick(props.image)}
            />
        case 1:
            return <img
                className="flightCardHand"
                alt={flightcard[1].imageName}
                src={flightcard[1].image}
                onClick={() => props.cardClick(props.image)}
            />
        case 2:
            return <img
                className="flightCardHand"
                alt={flightcard[2].imageName}
                src={flightcard[2].image}
                onClick={() => props.cardClick(props.image)}
            />
        case 3:
            return <img
                className="flightCardHand"
                alt={flightcard[3].imageName}
                src={flightcard[3].image}
                onClick={() => props.cardClick(props.image)}
            />
        case 4:
            return <img
                className="flightCardHand"
                alt={flightcard[4].imageName}
                src={flightcard[4].image}
                onClick={() => props.cardClick(props.image)}
            />
        case 5:
            return <img
                className="flightCardHand"
                alt={flightcard[5].imageName}
                src={flightcard[5].image}
                onClick={() => props.cardClick(props.image)}
            />
        case 6:
            return <img
                className="flightCardHand"
                alt={flightcard[6].imageName}
                src={flightcard[6].image}
                onClick={() => props.cardClick(props.image)}
            />
        case 7:
            return <img
                className="flightCardHand"
                alt={flightcard[7].imageName}
                src={flightcard[7].image}
                onClick={() => props.cardClick(props.image)}
            />
        case 8:
            return <img
                className="flightCardHand"
                alt={flightcard[8].imageName}
                src={flightcard[8].image}
                onClick={() => props.cardClick(props.image)}
            />
        default:
    }
};

export default FlightCard;
