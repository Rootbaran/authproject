"use client";
import signOut from "../lib/signOut";
import {useSession} from "../lib/hooks";
import React from "react";
import {useRouter} from "next/navigation";

export default function SignOut() {
  const router = useRouter();
  const {data: session, loading} = useSession();
  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6"></div>
      </div>
    );
  }
  if (session) {
    return (
      <div>
        <button
          className="px-3 py-3 hover:bg-gray-800 text-gray-400 hover:text-white rounded-md font-bold"
          onClick={() => {
            signOut();
            router.push("/");
            location.reload();
          }}
        >
          Sign Out
        </button>
      </div>
    );
  } else {
    return null;
  }
}
