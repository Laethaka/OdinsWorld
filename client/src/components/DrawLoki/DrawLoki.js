import React from "react";
import "./DrawLoki.css";

const DrawLoki = (props) => (
            <img 
                onClick={() => props.deckClick()}
                className="drawLokiDeck" 
                alt="Draw Loki" 
                src="https://res.cloudinary.com/mosjoandy/image/upload/v1530297890/OdinsRavensLandCards/card-15.png" />
);

export default DrawLoki;
