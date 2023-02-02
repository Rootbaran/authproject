import React from "react";
import SignUp from "../../components/SignUp";

export default function page() {
  return (
    <div className="flex flex-col space-y-6 w-full h-full items-center mt-52 justify-center">
      <div className="text-4xl">Sign Up</div>
      <SignUp />
    </div>
  );
}
