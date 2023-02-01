import React from "react";
import Login from "../components/Login";
import SignOut from "../components/SignOut";

export default function Page() {
  return (
    <div>
      <div>Login</div>
      <div>
        <Login />
      </div>
      <div className="ml-5">
        <SignOut />
      </div>
      a
    </div>
  );
}
