import React from "react";
import './LobbyGame.css';

const LobbyGame = (props) => (
        <div className="join-game-rectangle">
            <div className="row no-margins">
                <div className="col-8">
                    <h3 className="join-game-name">{[
                        "Thor's Hurricane", 
                        "Freya's Garden", 
                        "Tyr's Forge", 
                        "Balder's Meadow", 
                        "Frigg's Hearth",
                        "Loki's Lair"
                    ][props.id]}</h3>
                    <h3>Players in game</h3>
                    <p className="margin-left">– {props.players[0]}</p>
                    <p className="margin-left">– {props.players[1]}</p>
                </div>
            
                <div className="col-4 align-self-center d-flex justify-content-end">
                    <a type="btn" className="btn button button-join" id="joinButton" href={"/game/" + (props.id + 1) }>Join</a>
                </div>  
            </div>
        </div>
)

export default LobbyGame;