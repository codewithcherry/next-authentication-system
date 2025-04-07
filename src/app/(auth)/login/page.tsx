'use client';
import React from 'react'
import { googleSignIn } from '@/Oauth/actions/auth'

const page :React.FC = ()  => {
  return (
    <div>
      <h1>
        Login Page
      </h1>

      <div className='mx-auto w-full'>
        <button className='text-black p-2 rounded-md shadow-md  bg-slate-200 hover:bg-slate-300 hover:cursor-pointer' onClick={()=>googleSignIn()}>Signin with Google</button>
      </div>
    </div>
  )
}

export default page
