import React, { useState, useEffect } from "react";
import { Button, FormControl, InputLabel, OutlinedInput } from "@mui/material";
import db, { auth } from "./firebase";

import Nav from "./Nav";
import Profile from "./Profile";

function Items() {
  const [amount, setAmount] = useState();
  const [deposit, setDeposit] = useState();
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

  const sendInfo = () => {
      db.collection("users")
        .doc(auth.currentUser.uid)
        .set({
          name: auth.currentUser.displayName,
          email: auth.currentUser.email,
          photo: auth.currentUser.photoURL,
          amount: amount,
          deposit: deposit,
        })
        .then(async () => {
          await setAmount("");
          await setDeposit("");
        });
  };

  return (
    <div>
      <Nav />
      {data.length > 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: 70,
          }}
        >
          <Profile data={data} />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: 70,
          }}
        >
          <p>Fill in the following information before proceeding</p>
          <FormControl sx={{ m: 3, width: "45ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Enter deposit amount
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              value={deposit}
              onChange={(val) => setDeposit(val.target.value)}
              label="Enter deposit amount"
            />
          </FormControl>
          <FormControl sx={{ m: 3, width: "45ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Enter daily amount
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              value={amount}
              onChange={(val) => setAmount(val.target.value)}
              label="Enter daily amount"
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
      )}
    </div>
  );
}

export default Items;
