"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {useSession, SessionHookResponse} from "../lib/hooks";

let imgUrl =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrQRhoMoF8Y-qOgEQ1RZYhU_LNMBVkKDJ02g&usqp=CAU";

export default function PostCreator() {
  const {data: session, loading}: SessionHookResponse = useSession();
  const [postArgs, setPostArgs] = React.useState({
    title: "",
    content: "",
  });

  if (loading) return <div>Loading...</div>;
  return (
    <div className="container py-6 mx-auto grid grid-cols-[40%_auto]">
      <div className="mx-auto">
        <form className="flex flex-col space-y-6">
          <div>
            <label
              className="block text-gray-400/80 font-medium mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              onChange={(e) => {
                setPostArgs((prev) => ({...prev, title: e.target.value}));
              }}
              className="bg-[#0A2647] w-full outline outline-transparent focus:outline-blue-900 focus:ring-2 focus:ring-blue-900 px-2 text-gray-200  py-2 rounded-lg transition-all duration-200 ease-in-out"
            />
          </div>
          <div>
            <label
              className="block text-gray-400/80 font-medium mb-2"
              htmlFor="content"
            >
              Content
            </label>
            <textarea
              name="content"
              id="content"
              onChange={(e) => {
                setPostArgs((prev) => ({...prev, content: e.target.value}));
              }}
              className="bg-[#0A2647] scrollbar-none w-full h-full outline outline-transparent focus:outline-blue-900 focus:ring-2 focus:ring-blue-900 px-2 text-gray-200 py-2 rounded-lg transition-all duration-200 ease-in-out"
              cols={50}
              rows={20}
            ></textarea>
          </div>
        </form>
      </div>
      <div>
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold">Preview</h2>
          <button className="bg-blue-600 px-3 py-1.5 rounded-md font-medium text-white">
            Publish
          </button>
        </div>
        {postArgs.title !== "" || postArgs.content !== "" ? (
          <div className="shadow-lg  bg-[#0A2647] shadow-black/20 rounded-md p-3 space-y-2">
            <div className="flex gap-x-3">
              <Image
                src={imgUrl}
                alt="user"
                className="w-10 h-10 rounded-full object-cover"
                width={600}
                height={600}
                quality={100}
              />
              <div>
                <Link
                  href={`/user/${session?.user.username}`}
                  className="text-gray-300 hover:text-blue-600"
                >
                  {session?.user?.username}
                </Link>
              </div>
            </div>
            <h2 className="text-3xl  font-bold">{postArgs.title}</h2>
            <div className="text-gray-400">
              {postArgs.content.split("\n").map((it, i) => {
                if (it === "") return <br key={"x" + i} />;
                return <p key={i}>{it}</p>;
              })}
            </div>
          </div>
        ) : (
          <div className="text-gray-400">Nothing to preview</div>
        )}
      </div>
    </div>
  );
}
