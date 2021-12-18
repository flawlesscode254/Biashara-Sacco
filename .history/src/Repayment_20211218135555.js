import React, { useState, useEffect } from "react";
import { Button, FormControl, InputLabel, OutlinedInput } from "@mui/material";
import firebase from "firebase";
import db, { auth } from "./firebase";
import CircularProgress from "@mui/material/CircularProgress";

import Nav from "./Nav";

const RepayMent = () => {
  const [pay, setPay] = useState();
  const [data, setData] = useState();
  const [error, setError] = useState("");
  const [interest, setInterest] = useState()
  const [started, setStarted] = useState(false);

  useEffect(() => {
    db.collection("loans")
      .where("email", "==", auth?.currentUser?.email)
      .onSnapshot((snapshot) =>
        snapshot.docs.forEach((doc) =>  {
          setData(doc.data().amount),
          setInterest(doc.data())
        })
      );
  }, []);

  const decrement = firebase.firestore.FieldValue.increment(-pay);

  const sendInfo = async () => {
    // if (pay > data) {
    //   setError(
    //     "You can't enter an amount greater than the loan that you had requested before"
    //   );
    //   setPay("");
    // } else if (pay === 0) {
    //   setError("You can't enter an amount that is zero");
    //   setPay("");
    // } else if (pay < 0) {
    //   setError("You can't enter an amount that is less than zero");
    //   setPay("");
    // } else {
    await setStarted(!started);
    await db
      .collection("loans")
      .doc(auth?.currentUser?.uid)
      .update({
        name: auth?.currentUser?.displayName,
        email: auth?.currentUser?.email,
        photo: auth?.currentUser?.photoURL,
        amount: decrement,
      })
      .then(async () => {
        await db.collection(auth?.currentUser?.uid).add({
          time: firebase.firestore.FieldValue.serverTimestamp(),
          balance: data - pay,
          paid: pay,
          interest: interest,
          state: false
        });
        await setPay("");
        await setError("");
        await setStarted(started);
      })
      .catch((err) => {
        setError(err.message);
        setStarted(started);
      });
    // }
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
            type="number"
            id="outlined-adornment-password"
            value={pay}
            onChange={(val) => setPay(val.target.value)}
            label="Enter the amount you wish to pay back"
          />
        </FormControl>
        {started ? (
          <CircularProgress />
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default RepayMent;
