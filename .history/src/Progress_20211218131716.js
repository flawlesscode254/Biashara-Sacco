import Nav from "./Nav"
import { useEffect } from "react";
import { auth } from "./firebase";
import { useHistory } from "react-router-dom";

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
