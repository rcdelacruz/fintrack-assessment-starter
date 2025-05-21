'use client';

import { useAuth } from '@/hooks/useAuth';

export default function Header() {
  const { user, logout } = useAuth();
  
  return (
    <header className="bg-white shadow">
      <div className="mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
        <div className="flex items-center">
          <span className="mr-4 text-gray-700">
            {user?.firstName} {user?.lastName}
          </span>
          <button
            onClick={logout}
            className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}