import { useEffect, useState, useRef } from "react";
import "./Contact.css";
import "./MessageCreator.css";
import SendIcon from "@mui/icons-material/Send";
import db, { auth } from "./firebase";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import FlipMove from "react-flip-move";
import Message from "./Message";
import Nav from "./Nav";
import { useHistory } from "react-router-dom";
import SideNav from "./SideNav";

function Comments() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const history = useHistory();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        history.push("/");
      }
    });
    // eslint-disable-next-line
  }, []);

  // Listening for logged in user state
  const [user] = useAuthState(auth);

  // Fetchng data passed through route

  // Reference to div that enables autosroll
  const dummy = useRef();

  // Listener for fetching data from the database
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        db.collection(auth?.currentUser?.email)
          .orderBy("timestamp", "asc")
          .onSnapshot((snapshot) => {
            setMessages(
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

  // Sending a comment
  const sendComment = (e) => {
    e.preventDefault();
    db.collection(auth?.currentUser?.email)
      .add({
        comment: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        username: user?.displayName,
        email: auth?.currentUser?.email
      })
      .then(async () => {
        await setInput("");
        // Implementation of auto scroll functionality for the chat
        await dummy.current.scrollIntoView({ behavior: "smooth" });
      });
  };

  return (
    <div>
      <Nav />
      <div
        style={{
          position: "absolute",
          height: "100%"
        }}
      >
        <SideNav />
      </div>
      {/*Title section containing the owner of the post*/}

      {/*div for passing data to the message component and also displaying them*/}
      <div
        style={{
          marginBottom: 100,
          backgroundColor: "#30302f",
          width: "80%",
          margin: "0 auto",
        }}
      >
        {/*Allows for new comments to slide in in an animated way*/}
        <FlipMove>
          {messages.map(({ id, data }) => (
            <Message
              key={id}
              message={data.comment}
              username={data.username}
              email={data.email}
            />
          ))}
        </FlipMove>
        {/*Empty div for autoscroll*/}
        <div ref={dummy}></div>
      </div>

      {/*Writing and sending a comment*/}
        <div className="app__form">
          <div className="messageSender">
            <div className="messageSender__top">
              <form className="main-form" onSubmit={sendComment}>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="messageSender__input"
                  placeholder="Write a comment here.."
                />
                <div onClick={sendComment}>
                  <SendIcon color="primary" className="sendIcon" />
                </div>
              </form>
            </div>
          </div>
        </div>
    </div>
  );
}

export default Comments;
