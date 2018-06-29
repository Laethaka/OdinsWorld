import React, { Component } from "react";

const Nav = (props) => (
  <nav className="navbar navbar-expand-lg navbar-dark redNav pt-4 pb-4">
    <a className="navbar-brand" href="#">Odin's Reach</a>

    <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">

      {props.children}
      {props.user ?
        <div>
          <div className='user-profile'>
            <img src={props.user.photoURL} />
          </div>
        </div>
        :
        <div className='wrapper'>
          <p>Please log in to play Odin's Ravens!</p>
        </div>
      }
    </div>
  </nav>
)

export default Nav;
