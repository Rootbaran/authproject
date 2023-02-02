"use client";

import React, {useEffect} from "react";
import {useRouter} from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const [userData, setUserData] = React.useState<any>(null);
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const resp = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        username: event.target.username.value,
        email: event.target.email.value,
        password: event.target.password.value,
      }),
    });
    const data = await resp.json();
    setUserData(data);
  };
  useEffect(() => {
    if (userData?.session?.token) {
      localStorage.setItem("session", JSON.stringify(userData?.session?.token));
    }
    if (userData) {
      router.push("/");
      location.reload();
    }
  }, [userData]);

  return (
    <div className="p-8">
      <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
        <div className="flex gap-x-2 flex-col">
          <label htmlFor="username">Username</label>
          <input
            className="text-gray-800 px-1 py-px rounded-md"
            type="text"
            name="username"
            id="username"
          />
        </div>
        <div className="flex gap-x-2 flex-col">
          <label htmlFor="email">Email</label>
          <input
            className="text-gray-800 px-1 py-px rounded-md"
            type="email"
            name="email"
            id="email"
          />
        </div>

        <div className="flex gap-x-2 flex-col">
          <label htmlFor="password">Password</label>
          <input
            className="text-gray-800 px-1 py-px rounded-md"
            type="password"
            name="password"
            id="password"
          />
        </div>
        <input
          className="px-4 bg-teal-500 py-1 rounded-md text-gray-700"
          type="submit"
        />
      </form>
    </div>
  );
}
