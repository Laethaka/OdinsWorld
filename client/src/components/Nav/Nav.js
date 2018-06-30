import React, { Component } from "react";

const Nav = (props) => (
  <nav className="navbar navbar-expand-lg navbar-dark redNav pt-4 pb-4">
    <a className="navbar-brand" href="#">Odin's Reach</a>

    <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">

      {props.children}
      {props.user ?
        <div>
          <div className='user-profile'>
            <img className="rounded-circle" width="40px" src={props.user.photoURL} />
          </div>
        </div>
        :
        <div className='wrapper'>
          <img className="rounded-circle" width="40px" src="http://mikecavaliere.com/wp-content/uploads/2015/05/Question-300x300.png" />
        </div>
      }
    </div>
  </nav>
)

export default Nav;
