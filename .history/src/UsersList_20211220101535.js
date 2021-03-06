import React, { useState, useEffect } from "react";
import Badge from "@mui/material/Badge";
import db, {auth} from "./firebase";
import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { Link, useHistory } from "react-router-dom";

export default function AccessibleBadges() {
  const [data, setData] = useState([]);
  const history = useHistory
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
        if (!authUser || auth?.currentUser?.email !== "admin@gmail.com") {
            history.push("/");
          }
    });
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    db.collection("users")
    .where("email", "!=")
    .onSnapshot((snapshot) => {
      setData(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    // eslint-disable-next-line
  }, []);
  return (
    <div
      style={{
        width: "20%",
        margin: "0 auto",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {data.map((item) => (
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "10%",
          }}
          key={item.id}
        >
          <Link
            to={{
                pathname: "/reply",
                state: {
                    email: item.data.email
                }
            }}
          >
            <Avatar sx={{ bgcolor: deepOrange[500] }} alt="Remy Sharp">
              {item.data.email.split("")[0]}
            </Avatar>
            <Badge color="secondary" badgeContent={item.data.email}></Badge>
          </Link>
        </div>
      ))}
    </div>
  );
}
