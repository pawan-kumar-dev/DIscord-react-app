import React from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "../Config/firebase";
const Login = () => {
  const signIn = e => {
    e.preventDefault();
    //   before this enable the authentication in your firebase and select the google //method

    // signin with the auth protocol
    auth.signInWithPopup(provider).catch(err => alert(err.message));
  };
  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://upload.wikimedia.org/wikipedia/sco/thumb/9/98/Discord_logo.svg/800px-Discord_logo.svg.png"
          alt="logo"
        />
        <div className="login__text">
          <h1>Sign in to Discord</h1>
        </div>
        <Button type="submit" onClick={signIn}>
          Sign in With Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
