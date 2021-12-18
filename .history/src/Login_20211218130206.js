import Button from "@mui/material/Button";
import React, { useState } from "react";
import "./Login.css";
import { auth } from "./firebase";
import SubNavigation from "./SubNavigation";
import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import Box from "@mui/material/Box";
import { Link, useHistory } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const history = useHistory()

  const signIn = async () => {
    await auth
      .signInWithEmailAndPassword(email, password)
      .then(async () => {
        await setEmail("");
        await setPassword("");
        await history.push("/request");
      })
      .catch((err) => {
        setError(err.message);
      });
  };
  return (
    <div>
      <SubNavigation />
      <div className="login">
        {error && (
          <p
            style={{
              color: "red",
            }}
          >
            {error}
          </p>
        )}
        <h2>Log In to your account</h2>
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
                Enter your email address
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                value={email}
                onChange={(val) => setEmail(val.target.value)}
                label="Enter your email address"
              />
            </FormControl>
            <FormControl sx={{ m: 3, width: "45ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Enter your password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                value={password}
                onChange={(val) => setPassword(val.target.value)}
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
              onClick={signIn}
            >
              Log In
            </Button>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <p
                style={{
                  marginRight: 30,
                }}
              >
                Don't have an account?
              </p>
              <Link
                to={{
                  pathname: "/register",
                }}
              >
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
              </Link>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
}

export default Login;
