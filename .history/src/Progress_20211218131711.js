import Nav from "./Nav"
import { useEffect } from "react";
import { auth } from "./firebase";
import { useHistory } from "react-router-dom";

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
