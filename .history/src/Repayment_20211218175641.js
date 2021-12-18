import React, { useState, useEffect } from "react";
import { Button, FormControl, InputLabel, OutlinedInput } from "@mui/material";
import firebase from "firebase";
import db, { auth } from "./firebase";
import CircularProgress from "@mui/material/CircularProgress";

import Nav from "./Nav";
import { useHistory } from "react-router-dom";

const RepayMent = () => {
  const [pay, setPay] = useState();
  const [data, setData] = useState();
  const [error, setError] = useState("");
  const [interest, setInterest] = useState();
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState("")

  const history = useHistory()
  useEffect(() => {
      auth.onAuthStateChanged((authUser) => {
          if (!authUser) {
              history.push("/")
          }
        });
        // eslint-disable-next-line
    }, [])

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        db.collection("loans")
          .where("email", "==", auth?.currentUser?.email)
          .onSnapshot((snapshot) =>
            snapshot.docs.forEach(
              (doc) => (
                setData(doc.data().amount) 
                setInterest(doc.data().interest) setCurrent(doc.data().state))
              )
            )
          );
      }
    });
    // eslint-disable-next-line
  }, []);

  const decrement = firebase.firestore.FieldValue.increment(-pay);

  const sendInfo = async () => {
    if (current === "no") {
      setError("Your loan request is not approved yet!!")
      setPay("")
    }
    else if (current === "yes") {
    await setStarted(!started);
    await db
      .collection("loans")
      .doc(auth?.currentUser?.uid)
      .update({
        name: auth?.currentUser?.displayName,
        email: auth?.currentUser?.email,
        amount: decrement,
      })
      .then(async () => {
        await db.collection("repayments").add({
          time: firebase.firestore.FieldValue.serverTimestamp(),
          balance: Number(data - pay),
          paid: Number(pay),
          interest: Number(interest),
          state: "no",
          email: auth?.currentUser?.email
        });
        await setPay("");
        await setError("");
        await setStarted(started);
      })
      .catch((err) => {
        setError(err.message);
        setStarted(started);
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
            Pay
          </Button>
        )}
      </div>
    </div>
  );
};

export default RepayMent;
