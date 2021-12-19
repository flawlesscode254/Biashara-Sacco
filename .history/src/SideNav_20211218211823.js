import * as React from "react";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

export default function MenuListComposition() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Stack direction="row" spacing={3}>
      <Paper>
        <MenuList style={{
            padding: 10,
            backgroundColor: "black"
        }}>
          <Link style={{
              marginBottom: 50
          }} className="links" to="/request">
            <p style={{
                color: "white"
            }}>Request</p>
          </Link>
          <Link style={{
              marginBottom: 50
          }} className="links" to="/pay">
            <p style={{
                color: "white"
            }}>Repay</p>
          </Link>
          <Link style={{
              marginBottom: 50
          }} className="links" to="/progress">
            <p style={{
                color: "white"
            }}>Progress</p>
          </Link>
        </MenuList>
      </Paper>
    </Stack>
  );
}
