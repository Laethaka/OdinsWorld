import React from "react";
import "./LokiCard.css";
import lokicard from './lokicard.json';

function LokiCard(props) {
    switch (props.image) {
        case 0:
            return <img 
                className="lokiCardHand"
                alt={lokicard[0].imageName}
                src={lokicard[0].image}
                onClick={() => props.cardClick(props.image)}
            />
        case 1:
            return <img
                className="lokiCardHand"
                alt={lokicard[1].imageName}
                src={lokicard[1].image}
                onClick={() => props.cardClick(props.image)}
            />
        case 2:
            return <img
                className="lokiCardHand"
                alt={lokicard[2].imageName}
                src={lokicard[2].image}
                onClick={() => props.cardClick(props.image)}
            />
        case 3:
            return <img
                className="lokiCardHand"
                alt={lokicard[3].imageName}
                src={lokicard[3].image}
                onClick={() => props.cardClick(props.image)}
            />
    }
};

export default LokiCard;
