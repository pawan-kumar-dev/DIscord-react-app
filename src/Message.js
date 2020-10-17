import React from "react";
import "./Message.css";
import { Avatar } from "@material-ui/core";
const Message = () => {
  return (
    <div className="message">
      <Avatar src="" />
      <div className="message__info">
        <h4>
          pavan <span className="message__timestamp">timestamp...</span>
        </h4>
        <p>This is a message</p>
      </div>
    </div>
  );
};

export default Message;
