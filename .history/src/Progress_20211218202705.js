import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import db, { auth } from "./firebase";

import Nav from "./Nav";
import { useHistory } from "react-router-dom";
import SideNav from "./SideNav"

export default function Progress() {
  const [data, setData] = useState([]);
  const history = useHistory()
  useEffect(() => {
      auth.onAuthStateChanged((authUser) => {
          if (!authUser) {
              history.push("/")
          }
        });
        // eslint-disable-next-line
    }, [])
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        db.collection("repayments")
          .orderBy("time", "desc")
          .where("email", "==", auth?.currentUser?.email)
          .onSnapshot((snapshot) => {
            setData(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
              }))
            );
          });
      }
    });
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <Nav />
      <div
        style={{
          padding: 10,
          position: "fixed",
          top: 250,
          left: -730,
          zIndex: 1,
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
          margin: 100,
        }}
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 400 }} aria-label="simple table">
            <TableHead>
              <TableRow
                style={{
                  backgroundColor: "#000000",
                }}
              >
                <TableCell
                  style={{
                    color: "#FFFFFF",
                  }}
                >
                  Date of payment
                </TableCell>
                <TableCell
                  style={{
                    color: "#FFFFFF",
                  }}
                  align="right"
                >
                  Amount paid (Sh)
                </TableCell>
                <TableCell
                  style={{
                    color: "#FFFFFF",
                  }}
                  align="right"
                >
                  Pending balance (Sh)
                </TableCell>
                <TableCell
                  style={{
                    color: "#FFFFFF",
                  }}
                  align="right"
                >
                  Interest amount (Sh)
                </TableCell>
                <TableCell
                  style={{
                    color: "#FFFFFF",
                  }}
                  align="right"
                >
                  State
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {new Date(row.data.time?.toDate()).toUTCString()}
                  </TableCell>
                  <TableCell align="right">{row.data.paid.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                  <TableCell align="right">{row.data.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                  <TableCell align="right">{row.data.interest.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                  <TableCell style={{
                    color: row.data.state === "yes" ? "green" : "red"
                  }} align="right">{row.data.state === "yes" ? "Approved" : "Not approved"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
