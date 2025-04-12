"use server";

import React from "react";
import { auth } from "@/auth/auth";
import UserCard from "@/components/UserCard";
import Link from "next/link";

const UserPage: React.FC = async () => {
  const session:any = await auth();

  console.log(session.user)

  if(!session){
    return <div>
       <h1>User not authenticated</h1>
       <Link href={'/login'}>Goto Login</Link>
    </div>
  }

  return (
    <div className="w-full mx-auto p-6">
      <div className="mx-auto text-center mb-8">
        <h1 className="text-center text-slate-800 font-medium text-3xl">User Details</h1>
      </div>
      <div>
        <UserCard name={session.user?.name||"user name"} email={session.user?.email || "example@mail.com"} imageUrl={session.user?.image} role={session.user?.role} id={session.user?.id}/>
      </div>
      
    </div>
  );
};

export default UserPage;
