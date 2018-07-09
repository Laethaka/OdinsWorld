import React from "react";
import './LobbyGame.css';

const LobbyGame = (props) => (

    <div className="join-game-rectangle">
        <div className="row">
            <div className="col-sm-12">
                <h3 >Players in game</h3>
            </div>
        </div>

        <div className="row">
            <div className="col-sm-10">
                <p className="margin-left">– {props.players[0]}</p>
                <p className="margin-left">–{props.players[1]}</p>
            </div>
        
            <div className="col-sm-2">
                <a type="btn" className="btn button button-join" id="joinButton" href={"/game/" + (props.id + 1) }>Join</a>
            </div>  
        </div>
    </div>

)

export default LobbyGame;