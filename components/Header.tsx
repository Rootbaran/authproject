import Link from "next/link";
import React from "react";
import CreatePostButton from "./CreatePostButton";
import SignOut from "./SignOut";

export default function Header() {
  return (
    <div className="sticky bg-gray-900 mb-5">
      <div className="py-6 px-4 flex justify-between items-center">
        <div className="flex gap-x-4">
          <Link href="/" className="text-gray-400 font-medium hover:text-white">
            Home
          </Link>
          <Link
            href="/login"
            className="text-gray-400 font-medium hover:text-white"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="text-gray-400 font-medium hover:text-white"
          >
            Sign Up
          </Link>
        </div>
        <div className="flex gap-x-2">
          <CreatePostButton />
          <SignOut />
        </div>
      </div>
    </div>
  );
}
