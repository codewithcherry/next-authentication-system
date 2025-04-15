import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import NextAuth from "next-auth";
import authConfig from "@/auth/auth.config";

const { auth } = NextAuth(authConfig);

const publicRoutes = ["/", "/login", "/register"];
const protectedRoutes = ["/user"];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const isProtected = protectedRoutes.some((path) => pathname.startsWith(path));
  
    if (isProtected) {
      const session = await auth();
  
      console.log("middleware session:", session);
      if (!session?.user) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("callbackUrl", request.url);
        return NextResponse.redirect(loginUrl);
      }
  
      const response = NextResponse.next();
      response.headers.set("userId", session.user.id);
      return response;
    }
  
    // Only reach here if not protected — either public or unknown
    return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico).*)"],
};
