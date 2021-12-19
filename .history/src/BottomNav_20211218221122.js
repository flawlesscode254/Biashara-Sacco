import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import { Link } from "react-router-dom";
import "./App.css";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
      <div style={{
          
      }}>

      </div>
    <Box sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
          <Link
            style={{
              marginRight: 50,
            }}
            className="links"
            to="/contact"
          >
            <p
              style={{
                color: "black",
              }}
            >
              Contact Us
            </p>
          </Link>

        <Link className="links" to="/about">
          <p
            style={{
              color: "black",
            }}
          >
            About Us
          </p>
        </Link>
      </BottomNavigation>
    </Box>
  );
}
