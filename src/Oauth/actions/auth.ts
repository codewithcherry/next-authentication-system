'use server';

import {signIn,signOut} from '@/auth'

export const googleSignIn=async()=>{
    console.log("signin with google clicked")
    return await signIn('google')
}

export const SignOut=async()=>{
    return await signOut();
}
