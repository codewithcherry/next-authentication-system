import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/db";
import { authConfig } from "./config";
import NextAuth from "next-auth";

export const {
  auth: serverAuth,
  handlers: { GET: _, POST: __ }, // Not used for server components
} = NextAuth({
  ...authConfig,
  adapter: MongoDBAdapter(clientPromise),
  // Override session strategy if needed
  session: authConfig.session?.strategy === "jwt" ? undefined : authConfig.session,
});