"use client";

import { auth } from "@/auth";
import Image from "next/image";

export default async function Home() {

  const session = await  auth()

  if(!session){
    return <div>You are not logged in</div>
  }
  return (
    <>
    <div>
      <h1>
        Welcome to the home page
      </h1>
      <p>{session.user?.email}</p>
      <p>{session.user?.name}</p>
      <Image src={session.user?.image} height={48} width={48} alt={session.user?.name || "AVATAR"}/>
    </div>
    </>
  );
}
