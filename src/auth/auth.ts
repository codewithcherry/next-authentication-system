import NextAuth from "next-auth"
import authConfig from "../auth/auth.config"
 
import { MongoDBAdapter } from "@auth/mongodb-adapter"

import client from "@/lib/db"
 

 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: {
    ...MongoDBAdapter(client),
  },
  session: { strategy: "jwt" },
  pages: {
    signIn: '/login', // Custom error page to show the OAuthAccountNotLinked error
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // Check if this is an OAuth login
      if (account.provider !== "credentials") {
        // Check if user already exists in your DB
        const existingUser = await client.db()
          .collection("users")
          .findOne({ email: user.email })

        if (existingUser) {
          // Link accounts by updating the existing user
          await client.db()
            .collection("users")
            .updateOne(
              { email: user.email },
              { $set: { 
                provider: account.provider,
                providerAccountId: account.providerAccountId 
              }}
            )
          
          // Update the user object that will be used in the session
          user.id = existingUser._id.toString()
          user.role = existingUser.role || "user"
          return true
        }
      }
      return true // Proceed with normal flow for new users
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id
        token.role = user.role || "user"
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    }
  },
  ...authConfig,
})