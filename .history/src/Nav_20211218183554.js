import React, { useState, useEffect } from "react";
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
import db, { auth } from "./firebase";
import { useHistory } from "react-router-dom";

import Login from "./Login";

function Nav() {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const [user] = useAuthState(auth);
  const history = useHistory();
  const [data, setData] = useState();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        db.collection("loans")
          .where("email", "==", auth?.currentUser?.email)
          .onSnapshot((snapshot) =>
            snapshot.docs.forEach((doc) => setData(doc.data().amount))
          );
      }
    });
    // eslint-disable-next-line
  }, []);

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
              <React.Fragment>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ ml: 2 }}
                    >
                      <Avatar
                        sx={{ width: 32, height: 32 }}
                        src={`https://avatars.dicebear.com/api/avataaars/${
                          auth?.currentUser?.displayName.split(" ")[0]
                        }.svg`}
                      />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem>
                    <Avatar
                      src={`https://avatars.dicebear.com/api/avataaars/${
                        auth?.currentUser?.displayName.split(" ")[0]
                      }.svg`}
                    />
                    {auth?.currentUser?.displayName}
                  </MenuItem>
                  <MenuItem>
                    <Avatar
                      src={`https://avatars.dicebear.com/api/avataaars/${
                        auth?.currentUser?.displayName.split(" ")[0]
                      }.svg`}
                    />
                    {auth?.currentUser.email}
                  </MenuItem>
                  <MenuItem onClick={logOut}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Sign Out
                  </MenuItem>
                </Menu>
              </React.Fragment>
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
              {data && (
                <p
                  style={{
                    color: "red",
                  }}
                >
                  {data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </p>
              )}

              <React.Fragment>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ ml: 2 }}
                    >
                      <Avatar sx={{ width: 32, height: 32 }} />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem disabled={true}>
                    <Avatar sx={{ width: 32, height: 32 }} />
                    {auth?.currentUser.displayName}
                  </MenuItem>
                  <MenuItem disabled={true}>
                    <Avatar sx={{ width: 32, height: 32 }} />
                    {auth?.currentUser.email}
                  </MenuItem>
                  <MenuItem onClick={logOut}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Sign Out
                  </MenuItem>
                </Menu>
              </React.Fragment>
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
