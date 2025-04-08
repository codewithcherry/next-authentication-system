'use client';

import { logOut } from '@/Oauth/actions/auth';
import React from 'react'


const LogoutButton :React.FC = () => {
  return (
    <div>
      <button className='text-slate-500 bg-slate-800 p-2 rounded-md hover:bg-slate-900 hover:text-white hover:cursor-pointer' onClick={()=>logOut()}>
        Logout
      </button>
    </div>
  )
}

export default LogoutButton
