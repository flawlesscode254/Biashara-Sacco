import Button from "@mui/material/Button";
import React from "react";
import "./Login.css";
// import { auth, provider } from "./firebase";
import SubNavigation from "./SubNavigation";
import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import Box from "@mui/material/Box";

function Login() {
  //   const signIn = () => {
  //     auth.signInWithPopup(provider);
  //   };
  return (
    <div>
      <SubNavigation />
      <div className="login">
        <Box component="h3" sx={{ p: 2, border: "1px dashed grey" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <FormControl sx={{ m: 3, width: "45ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Enter the loan amount that you want
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                // value={amount}
                // onChange={(val) => setAmount(val.target.value)}
                label="Enter the loan amount that you want"
              />
            </FormControl>
            <FormControl sx={{ m: 3, width: "45ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Enter the loan amount that you want
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                // value={amount}
                // onChange={(val) => setAmount(val.target.value)}
                label="Enter the loan amount that you want"
              />
            </FormControl>
            <Button
              style={{
                paddingLeft: 30,
                paddingRight: 30,
                wid
              }}
              color="primary"
              type="submit"
              variant="outlined"
              //   onClick={sendInfo}
            >
              Submit
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
}

export default Login;
