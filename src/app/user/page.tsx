"use server";

import React from "react";
import Image from "next/image";
import { auth } from "@/auth";
import LogoutButton from "@/components/LogoutButton";

const UserPage: React.FC = async () => {
  const session:any = await auth();

  return (
    <div>
      <div>
        <h1>USER PAGE</h1>
      </div>
      <div>
        <p>{session.user?.email}</p>
        <p>{session.user?.name}</p>
        <Image
          src={session.user?.image || ""}
          height={48}
          width={48}
          alt={session.user?.name || "AVATAR"}
        />
      </div>
      <div>
        <LogoutButton />
      </div>
    </div>
  );
};

export default UserPage;
