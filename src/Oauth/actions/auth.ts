'use server';

import { signIn,signOut } from "@/auth/auth";

export const googleSignIn=async()=>{
    console.log("signin with google clicked")
    return await signIn('google',{redirectTo:'/'})
}

export const logOut=async()=>{
    return await signOut({redirectTo:'/'});
}
