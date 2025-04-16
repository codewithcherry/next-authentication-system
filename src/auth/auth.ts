import NextAuth from "next-auth"
import authConfig from "../auth/auth.config"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client from "@/lib/db"
import bcrypt from "bcryptjs"
import Credentials from "next-auth/providers/credentials"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: {
    ...MongoDBAdapter(client),
  },
  session: { strategy: "jwt" },
  pages: {
    signIn: '/login',
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required");
          }

          const email = credentials.email;
          const password = credentials.password as string;

          const db = client.db();
          const user = await db.collection("users").findOne({
            email: email
          });

          // If user doesn't exist, return null
          if (!user) {
            throw new Error("No user found with this email");
          }

          // If user exists but doesn't have a password (maybe signed up with another provider)
          if (!user.password) {
            throw new Error("Account exists with a different provider. Please sign in with that provider.");
          }

          // Verify password
          const isValid = await bcrypt.compare(password, user.password);
          if (!isValid) {
            throw new Error("Invalid password");
          }

          // Return user data if everything is valid
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            image:user.image,
            role: user.role || "user"
          };

        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
    ...authConfig.providers,
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // For OAuth providers (Google, GitHub, etc.)
      if (account?.provider !== "credentials") {
        if (!user.email) return false;
    
        const existingUser = await client.db()
          .collection("users")
          .findOne({ email: user.email.toLowerCase() });
    
        if (existingUser) {
          user.id = existingUser._id.toString();
          user.role = existingUser.role || "user";
        }
        return true;
      }
      
      // For credential-based logins (email/password)
      // The user object should already contain id and role from your authorize callback
      // But let's ensure it's properly set
      if (!user.id) {
        const dbUser = await client.db()
          .collection("users")
          .findOne({ email: user.email.toLowerCase() });
        
        if (dbUser) {
          user.id = dbUser._id.toString();
          user.role = dbUser.role || "user";
        }
      }
      
      return true;
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
})