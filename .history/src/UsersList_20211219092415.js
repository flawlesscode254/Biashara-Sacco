import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import db from "./firebase"

export default function AccessibleBadges() {
  const [data, setData] = useState([]);
  useEffect(() => {
    db.collection("users")
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
    <div>
      {data.map((item) => (
        <IconButton aria-label={item.data.email}>
          <Badge badgeContent={item.data.email} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <h1>{item.data.email}</h1>
      ))}
      <h1>Hello</h1>
    </div>
  );
}
