"use client";
import React from "react";
import Link from "next/link";
import {useSession} from "../lib/hooks";
import {useRouter} from "next/navigation";

export default function CreatePostButton() {
  const router = useRouter();
  const {data: session, loading} = useSession();
  const handleClick = () => {
    if (!session) {
      router.push("/login");
    } else {
      router.push("/create-post");
    }
  };
  if (loading) return <div className="px-3 py-3 w-24 bg-blue-600"></div>;
  return (
    <>
      <button
        onClick={handleClick}
        className="text-gray-300 font-bold rounded-md px-3 py-3 border border-blue-600 hover:bg-blue-600 hover:text-white"
      >
        Create Post
      </button>
    </>
  );
}
