'use server';

import { signIn,signOut } from "@/auth/auth";

interface signInData {
    email:string;
    password:string;
}

export const googleSignIn=async()=>{
    console.log("signin with google clicked")
    return await signIn('google',{redirectTo:'/'})
}

export const logOut=async()=>{
    return await signOut({redirectTo:'/'});
}

export const CredentialsSignIn=async(data:signInData)=>{
    return await signIn("credentials",{...data,redirectTo:"/"})
}