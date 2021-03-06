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
import { Link, useHistory } from "react-router-dom";
import { Button } from "@mui/material";

export default function Progress() {
  const [data, setData] = useState([]);
  const history = useHistory();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (!authUser || auth?.currentUser?.email !== "duncanii414@gmail.com") {
        history.push("/");
      }
    });
    // eslint-disable-next-line
  }, []);

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
      <Nav />
      {/* Admin only access */}
      {/* View the records of current borrowed loans and approve them */}
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
                  Date
                </TableCell>
                <TableCell
                  style={{
                    color: "#FFFFFF",
                  }}
                  align="right"
                >
                  ID
                </TableCell>
                <TableCell
                  style={{
                    color: "#FFFFFF",
                  }}
                  align="right"
                >
                  Period
                </TableCell>
                <TableCell
                  style={{
                    color: "#FFFFFF",
                  }}
                  align="right"
                >
                  Location
                </TableCell>
                <TableCell
                  style={{
                    color: "#FFFFFF",
                  }}
                  align="right"
                >
                  ID
                </TableCell>
                <TableCell
                  style={{
                    color: "#FFFFFF",
                  }}
                  align="right"
                >
                  Phone
                </TableCell>
                <TableCell
                  style={{
                    color: "#FFFFFF",
                  }}
                  align="right"
                >
                  Income
                </TableCell>
                <TableCell
                  style={{
                    color: "#FFFFFF",
                  }}
                  align="right"
                >
                  Amount
                </TableCell>
                <TableCell
                  style={{
                    color: "#FFFFFF",
                  }}
                  align="right"
                >
                  Username
                </TableCell>
                <TableCell
                  style={{
                    color: "#FFFFFF",
                  }}
                  align="right"
                >
                  Interest)
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
                    <Link to={row.data.image}>
                      <p>Id image</p>
                    </Link>
                  </TableCell>
                  <TableCell align="right">
                    {row.data.period}
                  </TableCell>
                  <TableCell align="right">
                    {row.data.location}
                  </TableCell>
                  <TableCell align="right">
                    {row.data.idNum}
                  </TableCell>
                  <TableCell align="right">
                    {row.data.phone}
                  </TableCell>
                  <TableCell align="right">
                    {row.data.income.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </TableCell>
                  <TableCell align="right">
                    {row.data.amount
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </TableCell>
                  <TableCell align="right">{row.data.name}</TableCell>
                  <TableCell align="right">
                    {row.data.interest
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </TableCell>
                  <TableCell align="right">
                    {row.data.state === "yes" ? (
                      <DoneAllIcon
                        style={{
                          color: "green",
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
                          db.collection("loans").doc(row.id).update({
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
