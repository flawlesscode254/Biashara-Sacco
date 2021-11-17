import React, {useState}  from "react";
import Box from "@mui/material/Box";
import { Button, FormControl, InputLabel, OutlinedInput } from "@mui/material";
import firebase from "firebase";
import db, {auth} from "./firebase"

const BoxComponent = ({ data }) => {
    const [amount, setAmount] = useState();

    const incrementAmount = firebase.firestore.FieldValue.increment(amount)

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
    }

  return (
    <div>
      {data.map((item) => (
        <Box
          key={item.id}
          component="h3"
          sx={{ p: 2, border: "1px dashed grey" }}
        >
          <h3>{`Balance amount: Sh. ${item.data.deposit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</h3>
          <h3>{`Daily amount: Sh. ${item.data.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</h3>
          <p>{`Created at: ${new Date(item.data.time?.toDate()).toDateString() + " " + " "}${" "}
          ${new Date(item.data.time?.toDate()).toLocaleTimeString()}`}</p>
        </Box>
      ))}
              <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: 70,
          }}
        >
          <p style={{
              textAlign: "center"
          }}>Do you wish to update your daily requirement amount? Do so here</p>
          <p
            style={{
              color: "red",
            }}
          ></p>
          <FormControl sx={{ m: 3, width: "45ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Enter new daily amount
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              value={amount}
              onChange={(val) => setAmount(val.target.value)}
              label="Enter new daily amount"
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
