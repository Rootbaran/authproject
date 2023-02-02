"use client";
import React from "react";
import {useSession} from "../../lib/hooks";

export default function Page() {
  const {data: session, loading} = useSession();
  console.log(session);
  if (loading) return <div>Loading...</div>;
  return <div>Deneme Page</div>;
}
