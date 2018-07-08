import React from "react";
import './LobbyGame.css';

const LobbyGame = (props) => (

    <div className="gamesAvail">
        <div className="row">
            <div className="col-sm-12">
                <h6 className="games-title">Players in game</h6>
            </div>
        </div>

        <div className="row">
            <div className="col-sm-9">
                <p className="margin-left">– {props.players[0]}</p>
                <p className="margin-left">–{props.players[1]}</p>
            </div>
        
            <div className="col-sm-3">
                <a type="btn" className="btn button button-join" id="joinButton" href={"/game/" + (props.id + 1) }>Join</a>
            </div>  
        </div>
        <hr className="style-one" />
    </div>

)

export default LobbyGame;