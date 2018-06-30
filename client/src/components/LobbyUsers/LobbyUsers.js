import React, { Component } from 'react';
import './LobbyUsers.css';

const LobbyUsers = (props) => {
    return (
        <div className="online-user-box">
            {/* Temporary image placeholder for users box */}
            <ul>
                <h3 className="user-online-title">Users Online</h3>
                <hr className="style-one"/>
                {props.users.map(function (user, index) {

                    return <li className="online-user-style" key={index}>{user}</li>;

                })}
            </ul>
        </div>
    )
};

export default LobbyUsers;