"use client";

import React from "react";
import UserCard from "@/components/UserCard";
import Link from "next/link";
import { useSession } from "next-auth/react";

const UserPage: React.FC = () => {
  const { data: session, status } = useSession();

  if (!session) {
    return (
      <div>
        <h1>User not authenticated</h1>
        <Link href={"/login"}>Goto Login</Link>
      </div>
    );
  }

  console.log(session.user); // ✅ Only runs if session is defined

  return (
    <div className="w-full mx-auto p-6">
      <div className="mx-auto text-center mb-8">
        <h1 className="text-center text-slate-800 font-medium text-3xl">
          User Details
        </h1>
      </div>
      <div>
        <UserCard
          name={session.user?.name || "user name"}
          email={session.user?.email || "example@mail.com"}
          image={session.user?.image}
          role={(session.user as any)?.role} // 👈 If you're extending user with a custom role
          id={(session.user as any)?.id}     // 👈 Same with id
        />
      </div>
    </div>
  );
};

export default UserPage;
