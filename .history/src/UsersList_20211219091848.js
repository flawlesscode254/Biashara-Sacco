import React, {useState, useEffect} from "react";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";

export default function AccessibleBadges() {
    const [data, setData] = useState([])
    useEffect(() => {
        db.collection("loans")
          .orderBy("time", "desc")
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
        {data.map(item => (
                  <IconButton aria-label={notificationsLabel(100)}>
        <Badge badgeContent={100} color="secondary">
          <MailIcon />
        </Badge>
      </IconButton>
        ))}

    </div>
  );
}
