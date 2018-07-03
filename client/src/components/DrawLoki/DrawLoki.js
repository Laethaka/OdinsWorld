import React from "react";
import "./DrawLoki.css";

const DrawLoki = (props) => (
    <div className="row drawPoop" onClick={() => props.deckClick()}>
        <div className="col-md-6">
            <h4>Loki</h4>
            <img width="100" alt="Draw Loki" src="https://res.cloudinary.com/mosjoandy/image/upload/v1530297890/OdinsRavensLandCards/card-15.png" />
        </div>
    </div>
);

export default DrawLoki;
