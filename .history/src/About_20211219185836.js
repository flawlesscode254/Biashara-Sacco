import React, {useEffect} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

import Nav from "./Nav";
import { useHistory } from "react-router-dom";
import { auth } from "./firebase";
import SideNav from "./SideNav"
import BottomNav from "./BottomNav"

const About = () => {
    const history = useHistory()
  // prevents access to unauthorized routes
    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            if (!authUser) {
                history.push("/")
            }
          });
          // eslint-disable-next-line
      }, [])

  return (
    <div>
      <Nav />
    {/* side navigation */}
      <div
        style={{
          padding: 10,
          top: 37,
          left: -760,
          width: "100%",
          marginTop: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "sticky"
        }}
      >
        <SideNav />
      </div>

        {/* image part */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 30
        }}
      >
        <Card sx={{ maxWidth: "50%" }}>
          <CardActionArea>
            <CardMedia
              component="img"
              image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.badcredit.org%2Fwp-content%2Fuploads%2F2019%2F10%2Fbest-money-loans-online.jpg&f=1&nofb=1"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Biashara Sacco
              </Typography>
              <Typography style={{
                  textAlign: "left"
              }} variant="body2" color="text.secondary">
                Biashara Sacco is a company that provides services such as loan borrowing and savings.
                This are the main exclusive benefits to our customers. We are also help develop companies
                for members that are wishing to start one.
                We aim to reduce the work load involved in making and receiving loans.
                Since our platform is digital, there is less paper work involved.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>

      {/* Bottom navigation */}
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
  );
};

export default About;
