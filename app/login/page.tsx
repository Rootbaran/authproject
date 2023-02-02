import React from "react";
import Login from "../../components/Login";

export default function Page() {
  return (
    <div className="flex flex-col space-y-6 w-full h-full items-center justify-center">
      <div className="text-4xl">Sign Up</div>
      <Login />
    </div>
  );
}
