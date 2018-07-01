import React, { Component } from 'react';
import './LobbyChat.css';

const LobbyChat = (props) => {
     
    return(
        <div className="chat-box">
        {/* Temporary image placeholder for chat box */}
            <h3 className="chat-title">Chat</h3>
            <hr className="style-one"/>

            <div className="col-md-12 border">
                <div className="chatPoop">
                    <div>
                        <ul>
                            {/* Replace with message history in firebase */}
                            {props.users.map(function (user, index) {
                                return <li key={index}>{user}</li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="row mt-2">
               
                    <div className="col-md-10">
                        <textarea className="form-control" id="sendMessageValue" rows="1"></textarea>
                    </div>

                    <div className="col-md-2">
                        <button type="button" className="btn btn-dark" id="sendMessageButton">Send</button>
                    </div>
             
            </div>
           
        </div>
    )
};

export default LobbyChat;