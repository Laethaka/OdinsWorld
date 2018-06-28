import React from "react";

const Nav = () => (

  <nav className="navbar navbar-expand-lg navbar-dark redNav pt-4 pb-4">
    <a className="navbar-brand" href="#">Odin's Reach</a>


    <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">

      {/* Conditional for logged in user */}

        <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="login" placeholder="Username" aria-label="login" />
            <input className="form-control mr-sm-2" type="password" placeholder="Password" aria-label="password" />
            <button className="btn btn-secondary my-2 my-sm-0" type="submit">Login</button>
        </form>


    </div>
  </nav>
);

export default Nav;
