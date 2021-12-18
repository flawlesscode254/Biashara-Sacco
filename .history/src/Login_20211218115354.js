import Button from "@mui/material/Button";
import React from "react";
import "./Login.css";
import { auth, provider } from "./firebase";
import SubNavigation from "./SubNavigation";
import { FormControl } from "@mui/material";

function Login() {
//   const signIn = () => {
//     auth.signInWithPopup(provider);
//   };
  return (
    <div>
      <SubNavigation />
      <div className="login">
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
            marginTop: 20,
            paddingLeft: 70,
            paddingRight: 70,
          }}
          color="primary"
          type="submit"
          variant="outlined"
        //   onClick={sendInfo}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default Login;
