import React, { useState, useEffect } from "react";
import { Button, FormControl, InputLabel, OutlinedInput } from "@mui/material";
import firebase from "firebase";
import db, { auth } from "./firebase";
import Nav from "./Nav";

const RepayMent = () => {
  const [pay, setPay] = useState();
  const [data, setData] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    db.collection("loans")
      .where("email", "==", auth?.currentUser.email)
      .onSnapshot((snapshot) =>
        snapshot.docs.forEach((doc) => setData(doc.data().amount))
      );
  }, []);

  const decrement = firebase.firestore.FieldValue.increment(-pay);

  const sendInfo = () => {
    if (pay > data) {
      setError("You can't enter an amount greater than the loan that you had requested before")
      setPay("");
    }
    else if (pay < 0) {
      setError("You can't enter an amount that is less than zero")
      setPay("");
    }
    else {
      db.collection("loans")
      .doc(auth?.currentUser.uid)
      .update({
        name: auth?.currentUser.displayName,
        email: auth?.currentUser.email,
        photo: auth?.currentUser.photoURL,
        amount: decrement,
        message:
          "You have paid back sh." +
          pay +
          "The current balance is " +
          Number(data) -
          Number(pay),
      })
      .then(async () => {
        await setPay("");
        await setError("")
      });
    }
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
        {error && (
          <p
            style={{
              color: "red",
            }}
          >
            {error}
          </p>
        )}
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
            Enter the amount you wish to pay back
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            value={pay}
            onChange={(val) => setPay(val.target.value)}
            label="Enter the amount you wish to pay back"
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
          Request
        </Button>
      </div>
    </div>
  );
};

export default RepayMent;