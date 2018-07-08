import React from "react";
import "./DrawFlight.css";

const DrawFlight = (props) => (
    <div className="col-sm-6">
        <div className=" drawData" onClick={() => props.deckClick()}>
            <h4>Land</h4>
            <img
                className="drawFlightDeck"
                width="100"
                alt="Draw Land"
                src="https://res.cloudinary.com/mosjoandy/image/upload/v1530297893/OdinsRavensLandCards/card-14.png"
            />
        </div>
    </div>
);

export default DrawFlight;
