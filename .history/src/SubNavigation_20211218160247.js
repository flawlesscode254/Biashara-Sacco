import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

function SubNavigation() {

  return (
    <>
        <div className="navigation">
          <Link className="links" to="/about">
            <p>About Us</p>
          </Link>
        </div>
    </>
  );
}

export default SubNavigation;
