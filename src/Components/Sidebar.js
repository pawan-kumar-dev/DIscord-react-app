import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import SidebarChannel from "./SidebarChannel";
import SignalCellularAltIcon from "@material-ui/icons/SignalCellularAlt";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import CallIcon from "@material-ui/icons/Call";
import { Avatar, TextField, Button } from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic";
import HeadsetIcon from "@material-ui/icons/Headset";
import SettingsIcon from "@material-ui/icons/Settings";
import { selectUser } from "../Redux/userSlice";
import { useSelector } from "react-redux";
import db, { auth } from "../Config/firebase";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 14
  }
}))(Tooltip);
const Sidebar = () => {
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState([]);
  const [open, setOpen] = useState(false);
  const [channelName, setChannelName] = useState("");
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    db.collection("channels").onSnapshot(snapshot => {
      setChannels(
        snapshot.docs.map(doc => {
          return {
            id: doc.id,
            data: doc.data()
          };
        })
      );
    });
  }, []);
  const addChannel = () => {
    if (channelName) {
      db.collection("channels").add({
        channelName: channelName
      });
      setChannelName("");
      handleClose();
    }
  };
  return (
    <div className="sidebar" role="button">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        className="sidebar__addChatModal"
      >
        <Fade in={open}>
          <div className="sidebar__addChatModalContainer">
            <TextField
              value={channelName}
              onChange={e => setChannelName(e.target.value)}
              id="outlined-basic"
              label="Enter Channel Name"
              variant="outlined"
              margin="dense"
            />
            <Button onClick={addChannel} className="sidebar__addChannelButton">
              Add Channel
            </Button>
          </div>
        </Fade>
      </Modal>
      <div className="sidebar__top">
        <h1>{user.displayName}</h1>
        <ExpandMoreIcon />
      </div>
      <div className="sidebar__channels">
        <div className="sidebar__channelHeader">
          <div className="sidebar__header">
            <ExpandMoreIcon />
            <h4>Text channel</h4>
          </div>
          <AddIcon onClick={handleOpen} className="sidebar__addChannel" />
        </div>
        <div className="sidebar__channelsList">
          {channels.map(({ id, data }) => {
            return (
              <SidebarChannel key={id} id={id} channelName={data.channelName} />
            );
          })}
        </div>
      </div>
      <div className="sidebar__voice">
        <SignalCellularAltIcon
          className="sidebar__voiceIcon"
          fontSize="large"
        />
        <div className="sidebar__voiceInfo">
          <h3>Voice Connected</h3>
          <p>Stream</p>
        </div>
        <div className="sidebar__voiceIcons">
          <InfoOutlinedIcon />
          <CallIcon />
        </div>
      </div>
      <div className="sidebar__profile">
        <LightTooltip placement="top" title="Logout">
          <Avatar onClick={() => auth.signOut()} src={user.photo} />
        </LightTooltip>
        <div className="sidebar__profileInfo">
          <h3>@{user.displayName}</h3>
          <p>#{user.uid.substring(0, 5)}</p>
        </div>
        <div className="sidebar__profileIcons">
          <MicIcon />
          <HeadsetIcon />
          <SettingsIcon />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
