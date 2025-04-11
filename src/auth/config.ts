import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Add other providers here
  ],
  session: {
    strategy: "jwt", // Required for Edge
  },
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === "development",
  // Add other shared config here
} satisfies NextAuthConfig;