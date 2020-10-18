import React, { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import Chat from "./Components/Chat";
import { selectUser } from "./Redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import Login from "./Components/Login";
import { auth } from "./Config/firebase";
import { login, logout } from "./Redux/userSlice";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  useEffect(() => {
    let mounted = true;
    if (window.innerWidth < 720) {
      if (mounted) setMobile(true);
    } else {
      if (mounted) setMobile(false);
    }
    return () => {
      mounted = false;
    };
  }, []);
  useEffect(() => {
    let mounted = true;
    window.addEventListener("resize", () => {
      if (window.innerWidth < 720) {
        if (mounted) setMobile(true);
      } else {
        if (mounted) setMobile(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <div className="app">
      {user ? (
        <>
          {mobile ? (
            <SwipeableDrawer
              anchor="left"
              open={open}
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
              role="button"
            >
              <Sidebar />
            </SwipeableDrawer>
          ) : (
            <Sidebar />
          )}
          <Chat handleClick={mobile ? () => setOpen(true) : null} />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
