import React from 'react';
import './LobbyUsers.css';

const LobbyUsers = (props) => {
    return (
        <div className="online-user-box">
            <h3 className="user-online-title">Users</h3>
            <hr className="style-one"/>

            <div className="usersPoop">

                <ul>
                    {props.users.map(function (user, index) {
                        return <li key={index}>{user}</li>
                    })}
                </ul>

            </div>
            
        </div>
    )
};

export default LobbyUsers;