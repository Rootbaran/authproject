"use client";
import signOut from "../lib/signOut";

import React from "react";

export default function SignOut() {
  return (
    <div>
      <button className="px-4 py-2 bg-rose-500" onClick={() => signOut()}>
        Sign Out
      </button>
    </div>
  );
}
