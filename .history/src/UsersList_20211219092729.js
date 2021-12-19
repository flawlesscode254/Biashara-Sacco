import React, { useState, useEffect } from "react";
import Badge from "@mui/material/Badge";
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
          <div key={item.id}>
              <Badge color="secondary" badgeContent={item.data.email}></Badge>
          </div>
      ))}
    </div>
  );
}
