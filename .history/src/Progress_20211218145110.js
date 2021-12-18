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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function Progress() {
  const [data, setData] = useState([]);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        db.collection(auth?.currentUser?.uid)
          .orderBy("time", "asc")
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
    console.log(data)
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
        {data && (
          <p>{}</p>
        )}

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
                  Amount paid
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
                  Interest amount
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
                    {new Date(row.time?.toDate()).toUTCString()}
                  </TableCell>
                  <TableCell align="right">{row.paid}</TableCell>
                  <TableCell align="right">{row.balance}</TableCell>
                  <TableCell align="right">{row.interest}</TableCell>
                  <TableCell align="right">{row.state}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
