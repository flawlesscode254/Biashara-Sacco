import React, {useState, useEffect} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Nav from "./Nav";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function Progress() {
  const [data, setData] = useState([])
  useEffect(() => {
    db.collection(id)
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setData(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      })
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <Nav />
      <div style={{
          margin: 100
      }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 600 }} aria-label="simple table">
          <TableHead>
            <TableRow style={{
                backgroundColor: "#000000"
            }}>
              <TableCell style={{
                  color: "#FFFFFF"
              }}>Date of payment</TableCell>
              <TableCell style={{
                  color: "#FFFFFF"
              }} align="right">Amount paid</TableCell>
              <TableCell style={{
                  color: "#FFFFFF"
              }} align="right">Pending balance</TableCell>
              <TableCell style={{
                  color: "#FFFFFF"
              }} align="right">Interest amount</TableCell>
              <TableCell style={{
                  color: "#FFFFFF"
              }} align="right">State</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    </div>
  );
}
