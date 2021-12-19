import React, { useState, useEffect } from "react";
import { Button, FormControl, InputLabel, OutlinedInput } from "@mui/material";
import db, { auth, store } from "./firebase";
import firebase from "firebase";
import CircularProgress from "@mui/material/CircularProgress";
import BottomNav from "./BottomNav";
import SideNav from "./SideNav";
import "./App.css"
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import Nav from "./Nav";
import { useHistory } from "react-router-dom";

function RequestLoan() {
  const [amount, setAmount] = useState();
  // const [data, setData] = useState();
  const [error, setError] = useState("");
  const [started, setStarted] = useState(false);
  const [data, setData] = useState();
  const [nature, setNature] = useState();
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [period, setPeriod] = useState("");
  const [idNum, setIdNum] = useState()
  const [phone, setPhone] = useState()

  // Handles the selection of a file that is being chosen for upload
  // For now it only supports image files
  const handleFile = async (e) => {
    if (e.target.files[0]) {
      await setImage(e.target.files[0]);
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        db.collection("savings")
          .where("email", "==", auth?.currentUser?.email)
          .onSnapshot((snapshot) =>
            snapshot.docs.forEach(
              // eslint-disable-next-line
              (doc) => (setNature(doc.data().state), setData(doc.data().amount))
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

  const sendInfo = async () => {
    // if (data === 0 || data === null) {
    await setStarted(!started);
      const uploadTask = store.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
        (error) => {
          console.log(error);
          alert(error.message);
        },
        () => {
          store
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(async (url) => {
              await db
                .collection("savings")
                .doc(auth?.currentUser?.uid)
                .set({
                  name: auth?.currentUser?.displayName,
                  email: auth?.currentUser?.email,
                  amount: (Number(amount)).toFixed(2),
                  balance: 0,
                  interest: (Number(amount) * 0.2).toFixed(2),
                  time: firebase.firestore.FieldValue.serverTimestamp(),
                  state: "no",
                  image: url,
                  location: location,
                  period: period,
                  idNum: idNum,
                  phone: phone
                })
                .then(async () => {
                  await setAmount("");
                  await setLocation("");
                  await setImage("");
                  await setPeriod("")
                  await setIdNum("")
                  await setPhone("")
                  await setError("");
                  await setStarted(started);
                })
                .catch((err) => {
                  setError(err.message);
                  setStarted(started);
                });
            });
        }
      );
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
          marginTop: 30
        }}
      >
        <div
                className="request"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
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
            {data && (
              <p
                style={{
                  color: "red",
                }}
              >
                {`Sh. ${data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
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
          <FormControl
            sx={{
              m: 3,
              width: "45ch",
              marginBottom: -2,
            }}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Enter the loan amount to save
            </InputLabel>
            <OutlinedInput
              type="number"
              id="outlined-adornment-password"
              value={amount}
              onChange={(val) => setAmount(val.target.value)}
              label="Enter the loan amount to save"
            />
          </FormControl>
          <FormControl
            sx={{ m: 3, width: "45ch", marginBottom: -2 }}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Enter your location
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              value={location}
              onChange={(val) => setLocation(val.target.value)}
              label="Enter your location"
            />
          </FormControl>
          <FormControl
            sx={{ m: 3, width: "45ch", marginBottom: -2 }}
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
          <FormControl
            sx={{ m: 3, width: "45ch", marginBottom: -2 }}
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
              Enter the savings period
            </InputLabel>
            <OutlinedInput
              type="number"
              id="outlined-adornment-password"
              value={period}
              onChange={(val) => setPeriod(val.target.value)}
              label="Enter the repayment period in months"
            />
          </FormControl>
          <FormControl style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <label htmlFor="file-input">
              <AddPhotoAlternateIcon
                style={{
                  color: "green",
                  cursor: "pointer",
                  marginRight: 30
                }}
              />
            </label>
            <input
              id="file-input"
              type="file"
              accept=".gif, .png, .jpeg, .jpg"
              onChange={handleFile}
              hidden
            />
            <h3>{!image ? "Upload photo of id" : image.name}</h3>
          </FormControl>
          {started ? (
            <CircularProgress />
          ) : (
            <Button
              style={{
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
}

export default RequestLoan;
