import Button from "@mui/material/Button";
import React, {useState} from "react";
import "./Login.css";
import { auth } from "./firebase";
import SubNavigation from "./SubNavigation";
import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

function Register() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
  const signUp = () => {
    
  };
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
                value={amount}
                onChange={(val) => setAmount(val.target.value)}
                label="Enter your email address"
              />
            </FormControl>
            <FormControl sx={{ m: 3, width: "45ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Enter your phone number
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                // value={amount}
                // onChange={(val) => setAmount(val.target.value)}
                label="Enter your phone number"
              />
            </FormControl>
            <FormControl sx={{ m: 3, width: "45ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Enter password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                // value={amount}
                // onChange={(val) => setAmount(val.target.value)}
                label="Enter password"
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
              onClick={signUp}
            >
              Register
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
                  //   onClick={sendInfo}
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
