import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import { Link } from "react-router-dom";
import "./App.css";
import useStore from "./useStore";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <Buttons to="/contact" title="Contact Us" />
        <Buttons to="/about" title="About Us" />
      </BottomNavigation>
    </Box>
  );
}

function Buttons({ to, title }) {
    const set
  return (
    <div>
      <Link onClick={setOpenTab} className="links" to={to}>
        <p
          style={{
            color: "black",
          }}
        >
          {title}
        </p>
      </Link>
    </div>
  );
}
