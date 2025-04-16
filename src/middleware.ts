import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import NextAuth from "next-auth";
import authConfig from "@/auth/auth.config";


const { auth } = NextAuth(authConfig);

const publicRoutes = ["/", "/login", "/register"];
const protectedRoutes = [
  "/api/user",
  "/user",

];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((path) => pathname.startsWith(path));

  if (isProtected) {
    const session = await auth();
     
    console.log("middleware session",session);
    
    if (!session?.user || isSessionExpired(session)) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", request.url);
      return NextResponse.redirect(loginUrl);
    }

    // Clone the request headers and add the userId
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('userId', session.user.id);

    // Create a new response with the modified headers
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    return response;
  }

  // Only reach here if not protected — either public or unknown
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico).*)"],
};

function isSessionExpired(session: any): boolean {
  return session.expires && new Date(session.expires) < new Date();
}