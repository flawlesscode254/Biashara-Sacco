import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";
import "./Login.css";
import { auth } from "./firebase";
import SubNavigation from "./SubNavigation";
import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import Box from "@mui/material/Box";
import { Link, useHistory } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [started, setStarted] = useState(false);

  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        if (email === "duncanii414@gmail.com") {
          await history.push("/borrowed");
        }
        else {
          await history.push("/request");
        }
      }
    });
      // eslint-disable-next-line
  }, [])

  const signIn = async () => {
    await setStarted(!started);
    await auth
      .signInWithEmailAndPassword(email, password)
      .then(async () => {
        await setEmail("");
        await setPassword("");
        await setStarted(started);
        if (email === "duncanii414@gmail.com") {
          await history.push("/borrowed");
        }
        else {
          await history.push("/request");
        }
      })
      .catch((err) => {
        setError(err.message);
        setStarted(started);
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
                type="password"
                id="outlined-adornment-password"
                value={password}
                onChange={(val) => setPassword(val.target.value)}
                label="Enter your password"
              />
            </FormControl>
            {started ? (
              <CircularProgress />
            ) : (
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
            )}
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
