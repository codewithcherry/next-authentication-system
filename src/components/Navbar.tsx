'use client';

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import LogoutButton from './LogoutButton';
import { useSession } from 'next-auth/react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  const [isLoggedIn,SetIsLoggedIn]=useState(false);

  
  useEffect(()=>{
    console.log("current session from nav",session);
    if(session){
      SetIsLoggedIn(true);
    }
    else{
      SetIsLoggedIn(false);
    }
  },[session,status])

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="text-xl font-bold text-gray-800">
            <Link href="/">Logo</Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition">Home</Link>
            {isLoggedIn ? (
              <>
                <Link href="/user" className="text-gray-700 hover:text-blue-600 transition">User</Link>
                <LogoutButton />
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-blue-600 transition">Login</Link>
                <Link href="/register" className="text-gray-700 hover:text-blue-600 transition">Signup</Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link href="/" className="block text-gray-700 hover:text-blue-600 transition">Home</Link>
          {isLoggedIn ? (
            <>
              <Link href="/user" className="block text-gray-700 hover:text-blue-600 transition">User</Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/login" className="block text-gray-700 hover:text-blue-600 transition">Login</Link>
              <Link href="/register" className="block text-gray-700 hover:text-blue-600 transition">Signup</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar;
