import React from "react";
import "./Message.css";
import { Avatar } from "@material-ui/core";
const Message = ({ data }) => {
  return (
    <div className="message">
      <Avatar src={data.user.photo} />
      <div className="message__info">
        <h4>
          {data.user.displayName}
          <span className="message__timestamp">
            {new Date(data.timestamp?.toDate()).toUTCString()}
          </span>
        </h4>
        <p>{data.message}</p>
      </div>
    </div>
  );
};

export default Message;
