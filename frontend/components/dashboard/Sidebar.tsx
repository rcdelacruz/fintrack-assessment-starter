'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  href: string;
  label: string;
  icon: string;
}

const navItems: NavItem[] = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: '📊',
  },
  {
    href: '/dashboard/transactions',
    label: 'Transactions',
    icon: '💵',
  },
  {
    href: '/dashboard/goals',
    label: 'Goals',
    icon: '🎯',
  },
  {
    href: '/dashboard/allocations',
    label: 'Allocations',
    icon: '📝',
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="bg-blue-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <div className="flex items-center space-x-2 px-4">
        <span className="text-2xl font-extrabold">FinTrack</span>
      </div>
      
      <nav className="mt-8">
        <div className="space-y-2 px-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/dashboard' && pathname?.startsWith(item.href));
              
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2 py-2 px-4 rounded transition-colors ${isActive ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}