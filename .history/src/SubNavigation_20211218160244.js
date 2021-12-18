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
          <Link className="links" to="/pay">
            <p>Pay Loan</p>
          </Link>
          <Link className="links" to="/progress">
            <p>Repayment Progress</p>
          </Link>
        </div>
    </>
  );
}

export default SubNavigation;
