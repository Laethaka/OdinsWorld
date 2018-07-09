import React from "react";
import "./EndTurnButton.css";

function EndTurnButton(props) {
    return <button className="button btn" onClick={() => props.buttonClick()}>Enter Draw Phase</button>
}

export default EndTurnButton;
