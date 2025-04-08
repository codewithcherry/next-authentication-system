"use client";

import Link from "next/link";

export default function Home() {
  
  return (
    <>
      <div>
        <h1>Welcome to the home page</h1>
        <Link href={'/user'}>Goto User</Link>
      </div>
    </>
  );
}
