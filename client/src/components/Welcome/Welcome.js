import React, { Component } from 'react';
import './Welcome.css';

const Welcome = () => { 
     
    return(
        <div className="card">
          <img className="card-img" src={require("../Images/paper-2-3.png")}/>
            <div className="card-img-overlay">
                <h3 className="card-title welcome-title">Welcome</h3>
                <p className="card-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged</p>
            </div>
        </div>
    )
};

export default Welcome;