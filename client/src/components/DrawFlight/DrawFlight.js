import React from "react";
import "./DrawFlight.css";

const DrawFlight = (props) => (
            <img
                className="drawFlightDeck"
                onClick={() => props.deckClick()}
                alt="Draw Land"
                src="https://res.cloudinary.com/mosjoandy/image/upload/v1530297893/OdinsRavensLandCards/card-14.png"
            />
);

export default DrawFlight;
