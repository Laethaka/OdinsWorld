import React from "react";
import "./Nav.css";

const Nav = (props) => (
  <nav className="navbar navbar-expand-lg">
    <a className="navbar-brand" href="#"><b><h1 className="game-name ">Odin's Ravens</h1></b></a>

    <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">

      {props.children}
      {props.user ?
        <div>
          <div className='user-profile'>
            <img className="rounded-circle mx-auto" src={props.user.photoURL} alt="Your Profile Photo" />
            <div className="text-center"></div>
          </div>
        </div>
        :
        <div className='wrapper'>
          <img className="rounded-circle mx-auto" src="http://mikecavaliere.com/wp-content/uploads/2015/05/Question-300x300.png" alt="Login Photo" />
          <div className="text-center">{props.user}</div>
        </div>
      }
    </div>
  </nav>
)

export default Nav;
