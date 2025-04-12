import NextAuth from "next-auth"
import authConfig from "../auth/auth.config"
 
import { MongoDBAdapter } from "@auth/mongodb-adapter"

import client from "@/lib/db"
 

 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(client),
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // Only add id and role to token if user is available (during sign-in)
      if (user) {
        token.id = user.id;
        // For OAuth providers like Google, you might want to set a default role
        token.role = user.role || "user";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      // This is where you can handle first-time sign-in for OAuth users
      if (account?.provider === "google") {
        // You might want to set default role for Google users here
        // Or fetch additional user data from your database
        user.role = "user"; // Default role for Google users
      }
      return true;
    }
  },
  ...authConfig,
})