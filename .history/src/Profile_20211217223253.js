import React, { useState } from "react";
import { Button, FormControl, InputLabel, OutlinedInput } from "@mui/material";
import firebase from "firebase";
import db, { auth } from "./firebase";

const BoxComponent = () => {
  const [amount, setAmount] = useState();

  const incrementAmount = firebase.firestore.FieldValue.increment(amount);

  const sendInfo = () => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .update({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
        photo: auth.currentUser.photoURL,
        amount: incrementAmount,
      })
      .then(async () => {
        await setAmount("");
      });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: 70,
        }}
      >
        <p
          style={{
            textAlign: "center",
          }}
        >
          Do you wish to pay back the loan? Do so here
        </p>
        <p
          style={{
            color: "red",
          }}
        ></p>
        <FormControl sx={{ m: 3, width: "45ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Enter amount to pay back
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            value={amount}
            onChange={(val) => setAmount(val.target.value)}
            label="Enter amount to pay back"
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
          Update
        </Button>
      </div>
    </div>
  );
};

export default BoxComponent;
