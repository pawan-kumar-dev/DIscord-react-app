import React, { useState, useEffect } from "react";
import "./Chat.css";
import ChatHeader from "./ChatHeader";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import GifIcon from "@material-ui/icons/Gif";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import Message from "./Message";
import { useSelector } from "react-redux";
import { selectUser } from "../Redux/userSlice";
import { selectChannelId, selectChannelName } from "../Redux/appSlice";
import db from "../Config/firebase";
import firebase from "firebase";

const Chat = ({ handleClick }) => {
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);

  const [input, setInput] = useState("");
  const [msg, setMsg] = useState([]);
  useEffect(() => {
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot(snapshot =>
          setMsg(
            snapshot.docs.map(doc => {
              return {
                id: doc.id,
                data: doc.data()
              };
            })
          )
        );
    }
  }, [channelId]);

  const sendMsg = e => {
    e.preventDefault();
    if (input) {
      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          message: input,
          user: user
        });
      setInput("");
    }
  };
  return (
    <div className="chat">
      <ChatHeader handleClick={handleClick} channelName={channelName} />
      <div className="chat__messages">
        {msg?.map(({ id, data }) => {
          return <Message key={id} data={data} />;
        })}
      </div>
      <div className="chat__input">
        <AddCircleIcon fontSize="large" />
        <form>
          <input
            value={input}
            disabled={!channelId}
            onChange={e => setInput(e.target.value)}
            type="text"
            placeholder={`Message #${channelName || ""}`}
          />
          <button onClick={sendMsg} className="chat__inputButton" type="submit">
            Send Message
          </button>
        </form>
        <div className="chat__inputIcons">
          <CardGiftcardIcon fontSize="large" />
          <GifIcon fontSize="large" />
          <EmojiEmotionsIcon fontSize="large" />
        </div>
      </div>
    </div>
  );
};

export default Chat;
