import React from 'react';
import './LobbyUsers.css';

const LobbyUsers = (props) => {
    return (

        <div className="users-cointainer">
            <ul>
                {props.users.map(function (user, index) {
                    return <p key={index}>{user}</p>
                })}
            </ul>
        </div>
        
    )
};

export default LobbyUsers;