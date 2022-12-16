import React from "react";
import "bulma/css/bulma.min.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          <img
            src="https://bulma.io/images/bulma-logo.png"
            width="112"
            height="28"
          />
        </a>

        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link to="/" className="navbar-item">
            Home
          </Link>
        </div>
        

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Link to="/posts" className="button is-light">
                Posts
              </Link>
              <Link to="/categories" className="button is-light">
                Categories 
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
