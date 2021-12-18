import Button from "@mui/material/Button";
import React from "react";
import "./Login.css";
// import { auth, provider } from "./firebase";
import SubNavigation from "./SubNavigation";
import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import Box from "@mui/material/Box";

function Register() {
  //   const signIn = () => {
  //     auth.signInWithPopup(provider);
  //   };
  return (
    <div>
      <SubNavigation />
      <div className="login">
          <h2>Register an account</h2>
        <Box component="h3" sx={{ p: 2, border: "1px dashed grey" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FormControl sx={{ m: 3, width: "45ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Enter your full name
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                // value={amount}
                // onChange={(val) => setAmount(val.target.value)}
                label="Enter Username"
              />
            </FormControl>
            <FormControl sx={{ m: 3, width: "45ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Enter your email address
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                // value={amount}
                // onChange={(val) => setAmount(val.target.value)}
                label="Enter Email Address"
              />
            </FormControl>
            <Button
              style={{
                paddingLeft: 30,
                paddingRight: 30,
                width: 200,
              }}
              color="primary"
              type="submit"
              variant="outlined"
              //   onClick={sendInfo}
            >
              Log In
            </Button>
            <div style={{
                display: "flex",
                justifyContent: "space-evenly",
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20
            }}>
              <p style={{
                  marginRight: 30
              }}>Don't have an account?</p>
              <Button
                style={{
                  paddingLeft: 30,
                  paddingRight: 30,
                  width: 200,
                }}
                color="secondary"
                type="submit"
                variant="outlined"
                //   onClick={sendInfo}
              >
                Register
              </Button>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
}

export default Register;
