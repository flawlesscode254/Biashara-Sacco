import Nav from "./Nav"
import React, { useState, useEffect } from "react";
import "./Login.css";
import { auth } from "./firebase";
import SubNavigation from "./SubNavigation";
import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import Box from "@mui/material/Box";
import { Link, useHistory } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [started, setStarted] = useState(false);

  const history = useHistory();

function Progress() {
    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                history.push("/request")
            }
          });
      }, [])
    return (
        <div>
            <Nav />
            <h1>Current Progress</h1>
        </div>
    )
}

export default Progress
