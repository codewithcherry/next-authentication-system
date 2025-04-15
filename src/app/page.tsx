"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {

  const {data:session}=useSession();

  useEffect(()=>{
    console.log("current session",session)
  },[session])
  
  return (
    <>
      <div>
        <h1 className="text-center text-3xl text-slate-800 my-10">Welcome to the home page</h1>
        
      </div>
    </>
  );
}
