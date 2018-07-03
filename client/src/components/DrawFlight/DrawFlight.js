import React from "react";
import "./DrawFlight.css";

const DrawFlight = (props) => (
    <div className="row drawPoop" onClick={() => props.deckClick()}>
        <div className="col-md-6">
            <h4>Land</h4>
            <img width="100" alt="Draw Land" src="https://res.cloudinary.com/mosjoandy/image/upload/v1530297893/OdinsRavensLandCards/card-14.png" />
        </div>
    </div>
);

export default DrawFlight;
