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
import Login from "./Login";

function Nav() {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const [user] = useAuthState(auth);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logOut = () => {
    auth.signOut();
  };

  return (
    <>
      {user ? (
        <div className="navigation">
          <Link className="links" to="/info">
            <p>Request Loan</p>
          </Link>
          <Link className="links" to="/pay">
            <p>Pay Loan</p>
          </Link>
          <Link className="links" to="/progress">
            <p>Repayment Progress</p>
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
                <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                  <Avatar
                    sx={{ width: 32, height: 32 }}
                    src={auth.currentUser.photoURL}
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
              <MenuItem disabled={true}>
                <Avatar
                  src={
                    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F000%2F376%2F355%2Foriginal%2Fuser-management-vector-icon.jpg&f=1&nofb=1"
                  }
                />
                {auth.currentUser.displayName}
              </MenuItem>
              <MenuItem disabled={true}>
                <Avatar
                  src={
                    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F000%2F421%2F673%2Foriginal%2Fvector-email-icon.jpg&f=1&nofb=1"
                  }
                />
                {auth.currentUser.email}
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
        <Login />
      )}
    </>
  );
}

export default Nav;
