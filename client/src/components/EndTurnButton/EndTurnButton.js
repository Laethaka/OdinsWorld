import React from "react";

function EndTurnButton(props) {
    return <button onClick={() => props.buttonClick()}>Draw Phase</button>
}

export default EndTurnButton;
