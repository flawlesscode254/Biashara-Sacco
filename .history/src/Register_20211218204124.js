import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";
import "./Login.css";
import db, { auth } from "./firebase";
import SubNavigation from "./SubNavigation";
import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import Box from "@mui/material/Box";
import { Link, useHistory } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [idCard, setIdCard] = useState("")
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [started, setStarted] = useState(false);

  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        if (auth?.currentUser?.email === "duncanii414@gmail.com") {
          history.push("/borrowed");
        }
        else {
          history.push("/request");
        }
      }
    });
            // eslint-disable-next-line
  }, [])

  const signUp = async () => {
    await setStarted(!started);
    await auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (authUser) => {
        await authUser.user.updateProfile({
          displayName: username
        });
        await db.collection("users").add({
          phoneNumber: phone
        })
        await setUsername("");
        await setPhone("");
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
        setUsername("");
        setEmail("");
        setPhone("");
        setPassword("");
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
                value={username}
                onChange={(val) => setUsername(val.target.value)}
                label="Enter your full name"
              />
            </FormControl>
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
                Enter your phone number
              </InputLabel>
              <OutlinedInput
                type="number"
                id="outlined-adornment-password"
                value={phone}
                onChange={(val) => setPhone(val.target.value)}
                label="Enter your phone number"
              />
            </FormControl>
            <FormControl sx={{ m: 3, width: "45ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Enter password
              </InputLabel>
              <OutlinedInput
                type="password"
                id="outlined-adornment-password"
                value={password}
                onChange={(val) => setPassword(val.target.value)}
                label="Enter password"
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
                onClick={signUp}
              >
                Register
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
                Already have an account?
              </p>

              <Link
                to={{
                  pathname: "/",
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
                  Log In
                </Button>
              </Link>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
}

export default Register;
