import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import Google from "next-auth/providers/google";
import client from "./lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({ 
  adapter: MongoDBAdapter(client),
  providers: [Google],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // optional: 30 days
  },
  
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === "development",
});