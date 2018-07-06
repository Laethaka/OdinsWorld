import React from "react";
import './LobbyGame.css';

const LobbyGame = (props) => (
    <div className="games-box">
        <hr className="style-one" />

        <div className="gamesData">
        Players in game:
            <ul>
                <li>{props.players[0]}</li>
                <li>{props.players[1]}</li>
            </ul>
        </div>
    </div>


)

export default LobbyGame;