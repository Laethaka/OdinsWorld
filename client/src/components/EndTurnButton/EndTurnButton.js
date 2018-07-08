import React from "react";

function EndTurnButton(props) {
    return <button onClick={() => props.buttonClick()}>End Turn</button>
}

export default EndTurnButton;
