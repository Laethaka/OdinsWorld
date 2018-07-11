import React from "react";
import "./EndTurnButton.css";

function EndTurnButton(props) {
    return <button className="button btn button-no-shadow" onClick={() => props.buttonClick()}>Enter Draw Phase</button>
}

export default EndTurnButton;
