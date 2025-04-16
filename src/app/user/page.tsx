"use client";

import React, { useState } from "react";
import UserCard from "@/components/UserCard";
import Link from "next/link";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const UserPage: React.FC = () => {

  const [user,setUser]=useState();
  const [loadingUser,setUserLoading]=useState(false);


  const { data: session, status } = useSession();


  const fetchUser=async () => {
    try {
      setUserLoading(true);
      const response=await axios.get("/api/user",{
        headers:{
          "Content-Type":'application/json'
        }
      })
      const data=response.data;
      console.log(data)
    } catch (error) {
      console.log(error);
    }
    finally{
      setUserLoading(false)
    }
  }

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

      <div>
        <Button variant={"default"} onClick={()=>fetchUser()}>
          {
            loadingUser?<Loader2 className="w-4 h-4 text-slate-500 animate-spin"/>:"Fetch User"
          }
        </Button>
      </div>
    </div>
  );
};

export default UserPage;
