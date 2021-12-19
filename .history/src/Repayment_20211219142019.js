import React, { useState, useEffect } from "react";
import { Button, FormControl, InputLabel, OutlinedInput } from "@mui/material";
import db, { auth } from "./firebase";
import CircularProgress from "@mui/material/CircularProgress";

import Nav from "./Nav";
import { useHistory } from "react-router-dom";
import SideNav from "./SideNav";
import BottomNav from "./BottomNav";

const RepayMent = () => {
  const [pay, setPay] = useState();
  const [data, setData] = useState();
  const [error, setError] = useState("");
  const [interest, setInterest] = useState();
  const [started, setStarted] = useState(false);
  // const [current, setCurrent] = useState("")
  const [num, setNum] = useState();
  const [nature, setNature] = useState();
  const [phone, setPhone] = useState()
  const [idNum, setIdNum] = useState()

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        db.collection("loans")
          .where("email", "==", auth?.currentUser?.email)
          .onSnapshot((snapshot) =>
            snapshot.docs.forEach(
              // eslint-disable-next-line
              (doc) => (setNum(doc.data().balance), setNature(doc.data().state))
            )
          );
      }
    });
    // eslint-disable-next-line
  }, []);

  const history = useHistory();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        history.push("/");
      }
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        db.collection("loans")
          .where("email", "==", auth?.currentUser?.email)
          .onSnapshot((snapshot) =>
            snapshot.docs.forEach(
              (doc) => (
                // eslint-disable-next-line
                setData(doc.data().amount), setInterest(doc.data().interest)
                // setCurrent(doc.data().state)
              )
            )
          );
      }
    });
    // eslint-disable-next-line
  }, []);

  const sendInfo = async () => {
    // if (current === "no") {
    //   setError("Your loan request is not approved yet!!")
    //   setPay("")
    // }
    // else if (current === "yes") {
    await setStarted(!started);
    await db
      .collection("loans")
      .doc(auth?.currentUser?.uid)
      .update({
        name: auth?.currentUser?.displayName,
        email: auth?.currentUser?.email,
        balance: Number(data - pay),
      })
      .then(async () => {
        await history.push("/paypal", {
          name: "Duncan",
          price: 200,
          balance: Number(data - pay),
          paid: Number(pay),
          interest: Number(interest),
          state: "no",
          email: auth?.currentUser?.email,
          username: auth?.currentUser?.displayName,
          phone: phone,
          IDNum: idNum,
          hasPaid: "no"
        })
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
          padding: 10,
          position: "fixed",
          top: 37,
          left: -760,
          width: "100%",
          marginTop: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SideNav />
      </div>
      <div
        style={{
          marginTop: 30,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: 100,
            backgroundColor: "white",
            width: "40%",
            margin: "0 auto",
            paddingBottom: 20,
            borderRadius: 25,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              width: "40%",
              margin: "0 auto",
            }}
          >
            {num && (
              <p
                style={{
                  color: "red",
                }}
              >
                {`Sh. ${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
              </p>
            )}
            {nature && (
              <p
                style={{
                  color: nature === "yes" ? "green" : "red",
                }}
              >
                {nature === "yes" ? "Approved" : "Not Approved"}
              </p>
            )}
          </div>
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
          <FormControl
            sx={{ m: 3, width: "45ch" }}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Enter your phone number
            </InputLabel>
            <OutlinedInput
              type="number"
              id="outlined-adornment-password"
              value={phone}
              onChange={(val) => setPhone(val.target.value)}
              label="Enter your phone number"
            />
          </FormControl>
          <FormControl
            sx={{ m: 3, width: "45ch" }}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Enter your id number
            </InputLabel>
            <OutlinedInput
              type="number"
              id="outlined-adornment-password"
              value={idNum}
              onChange={(val) => setIdNum(val.target.value)}
              label="Enter your id number"
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
        <div
          style={{
            padding: 10,
            position: "fixed",
            bottom: 0,
            zIndex: 1,
            width: "100%",
            marginTop: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BottomNav />
        </div>
      </div>
    </div>
  );
};

export default RepayMent;
