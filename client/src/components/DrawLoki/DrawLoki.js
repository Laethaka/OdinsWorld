import React from "react";
import "./DrawLoki.css";

const DrawLoki = (props) => (
    <div className="col-sm-6">
        <div className="drawData ml-3" onClick={() => props.deckClick()}>
            <h4>Loki</h4>
            <img className="drawLokiDeck" width="100" alt="Draw Loki" src="https://res.cloudinary.com/mosjoandy/image/upload/v1530297890/OdinsRavensLandCards/card-15.png" />
        </div>
    </div>
);

export default DrawLoki;
