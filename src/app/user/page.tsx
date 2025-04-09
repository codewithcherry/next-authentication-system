"use server";

import React from "react";
import Image from "next/image";
import { auth } from "@/auth";
import LogoutButton from "@/components/LogoutButton";
import UserCard from "@/components/UserCard";

const UserPage: React.FC = async () => {
  const session:any = await auth();
  console.log(session.user)

  return (
    <div className="w-full mx-auto p-6">
      <div className="mx-auto text-center mb-8">
        <h1 className="text-center text-slate-800 font-medium text-3xl">User Details</h1>
      </div>
      <div>
        <UserCard name={session.user?.name||"user name"} email={session.user?.email || "example@mail.com"} imageUrl={session.user?.image}/>
      </div>
      
    </div>
  );
};

export default UserPage;
