'use server';

import { signIn, signOut } from "@/auth/auth";
import { revalidatePath } from "next/cache";

interface signInData {
    email: string;
    password: string;
}

export const googleSignIn = async () => {
    console.log("signin with google clicked");
    await signIn('google', { redirectTo: '/' });
    revalidatePath('/');
}

export const logOut = async () => {
    await signOut({ redirectTo: '/' });
    revalidatePath('/');
}
