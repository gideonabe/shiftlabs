'use client'

import React from 'react';
import Link from 'next/link'; // 1. Swapped useRouter for Link
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { 
  Plus, MapPin, MessageSquare, Wallet, User, 
  Layers, Bell, Compass, LayoutGrid 
} from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuthStore();

  const mainNav = [
    { name: 'Dashboard', icon: LayoutGrid, path: '/dashboard' },
    { name: 'Discover', icon: Compass, path: '/discover' },
    { name: 'Map', icon: MapPin, path: '/map' },
  ];
  
  const personalNav = [
    { name: 'Messages', icon: MessageSquare, path: '/chat', badge: 3 },
    { name: 'Wallet', icon: Wallet, path: '/wallet' },
    { name: 'Alerts', icon: Bell, path: '/alerts', badge: 5 },
    // { name: 'Profile', icon: User, path: `/profile/${user?.id || 'me'}` },
    { name: 'Profile', icon: User, path: '/profile' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-[260px] bg-white border-r border-gray-200/60 z-30 h-full">
      {/* Brand Logo - Converted to Link */}
      <Link href="/dashboard" className="h-20 flex items-center px-8 cursor-pointer">
        <Layers size={24} className="text-[#2c745d] fill-current" strokeWidth={1.5} />
        <span className="ml-3 text-xl font-bold tracking-tight text-[#2c745d]">ShiftLabs.</span>
      </Link>

      <div className="flex-1 overflow-y-auto px-4 py-4 no-scrollbar flex flex-col gap-8">
        <div className="space-y-1">
          {mainNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              /* Converted button to Link */
              <Link
                key={item.name}
                href={item.path}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-semibold text-sm ${
                  isActive ? 'bg-[#112A22] text-white shadow-md' : 'text-gray-500 hover:text-[#112A22] hover:bg-gray-50'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-[#10B981]' : ''} />
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="space-y-1">
          <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Personal</p>
          {personalNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.path);
            return (
              /* Converted button to Link */
              <Link
                key={item.name}
                href={item.path}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all font-semibold text-sm ${
                  isActive ? 'bg-[#112A22] text-white shadow-md' : 'text-gray-500 hover:text-[#112A22] hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className={isActive ? 'text-[#10B981]' : ''} />
                  {item.name}
                </div>
                {item.badge && (
                  <div className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isActive ? 'bg-[#10B981] text-[#112A22]' : 'bg-[#10B981] text-white'}`}>
                    {item.badge}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="p-4 border-t border-gray-100">
        {/* Action Button - Converted to Link */}
        <Link 
          href="/create-gig"
          className="w-full bg-[#10B981] text-[#112A22] flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold hover:bg-[#0ea573] transition-colors mb-4 shadow-lg shadow-emerald-500/20"
        >
          <Plus size={18} /> Post a gig
        </Link>
        
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-[#112A22] font-bold border border-gray-200">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900 truncate">{user?.name || 'Maya'}</p>
            <p className="text-xs text-gray-500 truncate">Computer Science • Jnr</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
