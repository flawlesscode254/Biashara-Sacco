import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import db, { auth } from "./firebase";
import DoneAllIcon from "@mui/icons-material/DoneAll";

import Nav from "./Nav";
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";

export default function Progress() {
  const [data, setData] = useState([]);
  const history = useHistory();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
        if (!authUser || auth?.currentUser?.email !== "admin@gmail.com") {
            history.push("/");
          }
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    db.collection("repayments")
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
      <Nav />
      <div
        style={{
          margin: 100,
        }}
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 600 }} aria-label="simple table">
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
                  ID Number
                </TableCell>
                <TableCell
                  style={{
                    color: "#FFFFFF",
                  }}
                  align="right"
                >
                  Phone Number
                </TableCell>
                <TableCell
                  style={{
                    color: "#FFFFFF",
                  }}
                  align="right"
                >
                  Email Address
                </TableCell>
                <TableCell
                  style={{
                    color: "#FFFFFF",
                  }}
                  align="right"
                >
                  Pending balance
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
                  <TableCell align="right">
                    {row.data.paid
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </TableCell>
                  <TableCell align="right">
                    {row.data.IDNum}
                  </TableCell>
                  <TableCell align="right">
                    {row.data.phone}
                  </TableCell>
                  <TableCell align="right">
                    {row.data.email}
                  </TableCell>
                  <TableCell align="right">
                    {row.data.balance
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </TableCell>
                  <TableCell align="right">
                    {row.data.state === "yes" ? (
                      <DoneAllIcon 
                        style={{
                            color: "green"
                        }}
                      />
                    ) : (
                      <Button
                        style={{
                          paddingLeft: 30,
                          paddingRight: 30,
                          width: 200,
                        }}
                        color="primary"
                        type="submit"
                        variant="outlined"
                        onClick={() => {
                          db.collection("repayments").doc(row.id).update({
                            state: "yes",
                          });
                        }}
                      >
                        Approve
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
