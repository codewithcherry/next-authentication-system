"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {

  const {data:session}=useSession();

  useEffect(()=>{
    console.log("current session",session)
  },[session])
  
  return (
    <>
      <div>
        <h1>Welcome to the home page</h1>
        <Link href={'/user'}>Goto User</Link>
      </div>
    </>
  );
}
