import React, { useState } from "react";
import { Button, FormControl, InputLabel, OutlinedInput } from "@mui/material";
import db, { auth } from "./firebase";
import firebase from "firebase";

import Nav from "./Nav";

function Items() {
  const [amount, setAmount] = useState();
  const [deposit, setDeposit] = useState();

  const sendInfo = () => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .set({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
        photo: auth.currentUser.photoURL,
        amount: Number(amount),
        deposit: Number(deposit),
        time: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(async () => {
        await setAmount("");
        await setDeposit("");
      });
  };

  return (
    <div>
      <Nav />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: 70,
          }}
        >
          <p>Fill in the following information to get loan</p>
          <FormControl sx={{ m: 3, width: "45ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Enter the loan amount that you want
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              value={deposit}
              onChange={(val) => setDeposit(val.target.value)}
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
            onClick={sendInfo}
          >
            Submit
          </Button>
        </div>
    </div>
  );
}

export default Items;
