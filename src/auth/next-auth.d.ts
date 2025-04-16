import "next-auth"

declare module "next-auth" {
  interface User {
    id: string
    name:string
    email:string
    role?: string
    provider?: string
    providerAccountId?: string
  }
  
  interface Session {
    user: {
      id: string
      role: string
    } & DefaultSession["user"]
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    id: string
    role?: string
    provider?: string
    providerAccountId?: string
  }
}