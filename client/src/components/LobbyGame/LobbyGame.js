import React from "react";
import './LobbyGame.css';

const LobbyGame = (props) => (

    <div className="gamesAvail">
        <div className="row">
            <div className="col-sm-12">
                <div className="playerTitles">Players in game</div>
            </div>
        </div>

        <div className="row">
            <div className="col-sm-9">
                <div>{props.players[0]}</div>
                <div>{props.players[1]}</div>
            </div>
        
            <div className="col-sm-3">
                <a type="btn" className="btn btn-dark pr-4 pl-4" id="joinButton" href={"/game/" + (props.id + 1) }>Join</a>
            </div>  
        </div>
        <hr className="style-one" />
    </div>

)

export default LobbyGame;