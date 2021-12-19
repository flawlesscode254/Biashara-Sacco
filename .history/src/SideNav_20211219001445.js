import * as React from "react";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

export default function MenuListComposition() {

  return (
    <Stack direction="row" spacing={3}>
      <Paper>
        <MenuList style={{
            padding: 10,
            backgroundColor: "#010c40",
            height: "100vh",
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "column"
        }}>
          <Link style={{
              backgroundColor: "black",
              width: "100%",
              paddingLeft: 5,
              paddingRight: 5
          }} className="links" to="/request">
            <p style={{
                color: "white"
            }}>🥺 Request</p>
          </Link>
          <Link style={{
              marginBottom: 50,
              backgroundColor: "black",
              width: "100%",
              paddingLeft: 5,
              paddingRight: 5
          }} className="links" to="/pay">
            <p style={{
                color: "white"
            }}>💸Repay</p>
          </Link>
          <Link style={{
              marginBottom: 100,
              backgroundColor: "black",
              width: "100%",
              paddingLeft: 5,
              paddingRight: 5
          }} className="links" to="/progress">
            <p style={{
                color: "white"
            }}>✈️ Progress</p>
          </Link>
        </MenuList>
      </Paper>
    </Stack>
  );
}
