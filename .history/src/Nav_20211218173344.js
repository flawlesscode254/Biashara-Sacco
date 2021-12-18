import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { useHistory } from "react-router-dom";

import Login from "./Login";

function Nav() {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const [user] = useAuthState(auth);
  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logOut = () => {
    auth.signOut().then(() => history.push("/"));
  };

  return (
    <>
      {user ? (
        <div>
          {auth?.currentUser?.email === "duncanii414@gmail.com" ? (
            <div className="navigation">
              <Link className="links" to="/borrowed">
                <p>Borrowed Loans</p>
              </Link>
              <Link className="links" to="/repayments">
                <p>Repayment Amount</p>
              </Link>
            </div>
          ) : (
            <div className="navigation">
              <Link className="links" to="/contact">
                <p>Contact Us</p>
              </Link>
              <Link className="links" to="/about">
                <p>About Us</p>
              </Link>

              <Link className="links" to="/request">
                <p>Request Loan</p>
              </Link>
              <Link className="links" to="/pay">
                <p>Repay Loan</p>
              </Link>
              <Link className="links" to="/progress">
                <p>Payment Progress</p>
              </Link>
            </div>
          )}
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}

export default Nav;
