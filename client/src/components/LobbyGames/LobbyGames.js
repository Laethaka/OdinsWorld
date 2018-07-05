import React, { Component } from "react";
import firebase from '../../firebase.js'
import './LobbyGames.css';

class LobbyGames extends Component { 

    constructor(props) {
        super(props);
        this.state = {
            usersInLobby: [],
            usersInGame: [],
        };
    };

    componentWillMount(){

    };
    

    render() {
        return (
            <div className="games-box">
                <h3 className="games-title">Games</h3>
                <hr className="style-one"/>

                <div className="gamesPoop">
                    <ul>
                        <h6>Poop</h6>
                    </ul>
                </div>
            </div>

        
        )
    };
};
        
export default LobbyGames;