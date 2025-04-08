import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { auth } from "@/auth";

const protectedRoutes = ["/user"];

export const middleware = async (request: NextRequest) => {
    const session = await auth();
    const { pathname } = request.nextUrl;

    console.log("middleware entered");

    const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

    if (isProtected && !session) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
};
