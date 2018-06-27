import React from "react";

const Nav = () => (

  <nav className="navbar navbar-expand-lg navbar-dark bg-dark pt-4 pb-4">
    <a className="navbar-brand" href="#">Odin's Reach</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
                <a className="nav-link" href="#">Home<span className="sr-only">(current)</span></a>
            </li>
        </ul>

      {/* Conditional for logged in user */}

        <form className="form-inline my-2 my-lg-0">
            <label className="text-light mr-2" for="login">Username</label>
            <input className="form-control mr-sm-2" type="login" placeholder="Brodin55" aria-label="login" />
            <label className="text-light mr-2" for="password">Password</label>
            <input className="form-control mr-sm-2" type="password" placeholder="Password" aria-label="password" />
            <button className="btn btn-secondary my-2 my-sm-0" type="submit">Login</button>
        </form>


    </div>
  </nav>
);

export default Nav;
