import React, { useState, useEffect } from "react";
import { Button, FormControl, InputLabel, OutlinedInput } from "@mui/material";
import firebase from "firebase";
import db, { auth } from "./firebase";
import Required from "./Required";

const Emergency = () => {
  const [amount, setAmount] = useState();
  const [data, setData] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        db.collection("users")
          .where("email", "==", auth.currentUser.email)
          .onSnapshot((snapshot) =>
            setData(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
              }))
            )
          );
      }
    });
  }, []);

  const decrement = firebase.firestore.FieldValue.increment(-amount);

  const sendInfo = () => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .update({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
        photo: auth.currentUser.photoURL,
        deposit: decrement,
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
        <Required data={data} />
      </div>
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
            Enter amount you need
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            value={amount}
            onChange={(val) => setAmount(val.target.value)}
            label="Enter amount you need"
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

export default Emergency;
