import Nav from "./Nav"
import

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
