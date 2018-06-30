import React, { Component } from 'react';
import './LobbyUsers.css';

const LobbyUsers = (props) => {
    return (
        <div>
            {/* Temporary image placeholder for users box */}
            <ul>
                {props.users.map(function (user, index) {
                    return <li key={index}>{user}
                              
                            </li>
                       
                })}
            </ul>
        </div>
    )
};

export default LobbyUsers;