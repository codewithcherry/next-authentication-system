'use client';

import { signOut } from 'next-auth/react';
import React from 'react';

const LogoutButton: React.FC = () => {
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <div>
      <button
        className="text-slate-500 bg-slate-800 p-2 rounded-md hover:bg-slate-900 hover:text-white hover:cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
