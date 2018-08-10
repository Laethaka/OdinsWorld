import React from "react";
import "./Nav.css";

const Nav = (props) => (
  <nav className="navbar align-self-center navbar-expand-lg">
    <a className="navbar-brand" id="navBarLogo1" href={"/Landing"}><h1 className="game-name">Odin's Ravens</h1></a>
    <a className="navbar-brand" id="navBarLogo2" href={"/Landing"}><h1 className="game-name">OR</h1></a>
    <div className="navbar-collapse d-flex justify-content-lg-end" id="navbarSupportedContent1">

      {props.children}
      {props.user ?
        <div>
          <div className='user-profile'>
            <img className="rounded-circle mx-auto" src={props.user.photoURL} alt="Your Profile" />
          </div>
        </div>
        :
        <div className='wrapper'>
          <img className="rounded-circle mx-auto" src={require("../Images/Notlogged.png")} alt="Login" />
        </div>
      }
    </div>
  </nav>
)

export default Nav;
