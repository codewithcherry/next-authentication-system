import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import client from "@/lib/db"

export default {
  providers: [
    Google,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required")
          }

          const db = client.db()
          const user = await db.collection("users").findOne({ 
            email: credentials.email.toLowerCase()
          })

          // If user exists and has password (credentials user)
          if (user && user.password) {
            const isValid = await bcrypt.compare(
              credentials.password as string,
              user.password
            )
            
            if (!isValid) {
              throw new Error("Invalid password")
            }

            return {
              id: user._id.toString(),
              email: user.email,
              name: user.name,
              role: user.role || "user"
            }
          }

          // If user doesn't exist, create a new one
          if (!user) {
            const hashedPassword = await bcrypt.hash(
              credentials.password as string, 
              10
            )
            
            const result = await db.collection("users").insertOne({
              email: credentials.email.toLowerCase(),
              password: hashedPassword,
              name: credentials.email.split("@")[0], // Default name
              role: "user",
              provider: "credentials",
              createdAt: new Date(),
              updatedAt: new Date()
            })

            return {
              id: result.insertedId.toString(),
              email: credentials.email,
              name: credentials.email.split("@")[0],
              role: "user"
            }
          }

          // If user exists but doesn't have password (OAuth user)
          throw new Error("Account already exists with a different provider. Please sign in with that provider.")
          
        } catch (error) {
          console.error("Authentication error:", error)
          return null
        }
      },
    }),
  ],
} satisfies NextAuthConfig