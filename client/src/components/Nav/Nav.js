import React from "react";
import "./Nav.css";

const Nav = (props) => (
  <nav className="navbar align-self-center navbar-expand-lg">
    <a className="navbar-brand" href={"/Landing"}><h1 className="game-name">Odin's Ravens</h1></a>
    <div className="navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">

      {props.children}
      {props.user ?
        <div>
          <div className='user-profile'>
            <img className="rounded-circle mx-auto" src={props.user.photoURL} alt="Your Profile" />
          </div>
        </div>
        :
        <div className='wrapper'>
          <img className="rounded-circle mx-auto" src="http://mikecavaliere.com/wp-content/uploads/2015/05/Question-300x300.png" alt="Login" />
        </div>
      }
    </div>
  </nav>
)

export default Nav;
