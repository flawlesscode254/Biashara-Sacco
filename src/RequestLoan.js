import React, { useState, useEffect } from "react";
import { Button, FormControl, InputLabel, OutlinedInput } from "@mui/material";
import db, { auth } from "./firebase";
import firebase from "firebase";
import CircularProgress from "@mui/material/CircularProgress";

import Nav from "./Nav";
import { useHistory } from "react-router-dom";

function RequestLoan() {
  const [amount, setAmount] = useState();
  const [data, setData] = useState();
  const [error, setError] = useState("");
  const [started, setStarted] = useState(false);

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
          .where("email", "==", auth?.currentUser.email)
          .onSnapshot((snapshot) =>
            snapshot.docs.forEach((doc) => setData(doc.data().amount))
          );
      }
    });
    // eslint-disable-next-line
  }, []);

  const sendInfo = async () => {
      if (data === 0 || data === null) {
            await setStarted(!started);
    await db
      .collection("loans")
      .doc(auth?.currentUser?.uid)
      .set({
        name: auth?.currentUser?.displayName,
        email: auth?.currentUser?.email,
        amount: Number(amount) + 0.15 * Number(amount),
        interest: Number(amount) * 0.15,
        time: firebase.firestore.FieldValue.serverTimestamp(),
        state: "no"
      })
      .then(async () => {
        await setAmount("");
        await setError("");
        await setStarted(started);
      })
      .catch((err) => {
        setError(err.message);
        setStarted(started);
      });
      }
      else if (data > 0) {
        setError("You cannot request another loan before paying off the previous one!!")
        setAmount("")
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

        <p>Fill in the following information to get loan</p>
        <FormControl sx={{ m: 3, width: "45ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Enter the loan amount that you want
          </InputLabel>
          <OutlinedInput
            type="number"
            id="outlined-adornment-password"
            value={amount}
            onChange={(val) => setAmount(val.target.value)}
            label="Enter the loan amount that you want"
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
}

export default RequestLoan;
