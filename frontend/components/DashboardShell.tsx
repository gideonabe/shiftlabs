'use client'

import React, { useState } from 'react';
import Link from 'next/link'; // 1. Imported Link
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { 
  Search, Plus, MapPin, MessageSquare, User, 
  Settings, LogOut, Bell, Compass, LayoutGrid, 
  ChevronDown,
  Layers,
  Wallet
} from 'lucide-react';

// export function TopHeader() {
//   const router = useRouter();
//   const { logout } = useAuthStore();
//   const [searchQuery, setSearchQuery] = useState('');

//   // Keep this! Event-driven navigation is perfect here.
//   const handleLogout = () => {
//     logout();
//     router.push('/');
//   };

//   return (
//     <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-200/60 h-20 px-6 sm:px-10 flex items-center justify-between w-full">
//       <div className="flex-1 max-w-2xl">
//         <div className="relative group">
//           <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//             <Search size={18} className="text-gray-400 group-focus-within:text-[#112A22] transition-colors" />
//           </div>
//           <input
//             type="text"
//             placeholder="Search gigs, people, skills..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full bg-gray-50 border border-gray-200/80 text-sm font-medium rounded-full py-3 pl-12 pr-4 focus:bg-white focus:border-[#10B981] focus:ring-4 focus:ring-[#10B981]/10 transition-all outline-none shadow-sm"
//           />
//         </div>
//       </div>
      
//       <div className="flex items-center gap-2 sm:gap-4 ml-4">
//         {/* Converted to Link */}
//         <Link href="/alerts" className="hidden sm:block p-2 text-gray-400 hover:text-[#112A22] transition-colors relative">
//           <Bell size={20} />
//           <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
//         </Link>
        
//         {/* Converted to Link */}
//         <Link href="/settings" className="hidden sm:block p-2 text-gray-400 hover:text-[#112A22] transition-colors">
//           <Settings size={20} />
//         </Link>

//         {/* Kept as button because it runs logout functionality */}
//         <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
//           <LogOut size={20} />
//         </button>
//       </div>
//     </header>
//   );
// }


export function TopHeader() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-gray-100 h-20 px-4 sm:px-8 flex items-center justify-between w-full transition-all">
      
      {/* 1. BRAND LOGO - Visible ONLY on mobile/tablet (< md screens) */}
      <Link href="/dashboard" className="flex md:hidden items-center mr-4 group active:scale-95 transition-transform">
        <div className="w-8 h-8 bg-[#112A22] rounded-xl flex items-center justify-center shadow-md shadow-[#112A22]/10">
          <Layers size={20} className="text-[#10B981] fill-current" strokeWidth={1} />
        </div>
        {/* <span className="ml-2.5 text-lg font-black tracking-tight text-[#112A22]">Shift</span> */}
      </Link>

      {/* 2. SEARCH BAR - Centered & flexible spacing */}
      <div className="flex-1 max-w-md md:max-w-xl mx-auto md:mx-0">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400 group-focus-within:text-[#112A22] transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search gigs, skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50/80 border border-gray-200/50 text-sm font-medium rounded-2xl py-2.5 pl-11 pr-4 focus:bg-white focus:border-[#10B981] focus:ring-4 focus:ring-[#10B981]/5 transition-all outline-none"
          />
        </div>
      </div>
      
      {/* 3. RIGHT SIDE UTILITIES & MODERN PROFILE DRAWER */}
      <div className="flex items-center gap-1 sm:gap-3 ml-4">
        
        {/* Desktop Only Actions */}
        <Link href="/alerts" className="hidden sm:flex p-2.5 text-gray-500 hover:text-[#112A22] hover:bg-gray-50 rounded-xl transition-all relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </Link>
        
        <Link href="/settings" className="hidden sm:flex p-2.5 text-gray-500 hover:text-[#112A22] hover:bg-gray-50 rounded-xl transition-all">
          <Settings size={20} />
        </Link>

        {/* Global Modern Profile Pill Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 p-1.5 pr-2.5 rounded-full border border-gray-200/60 bg-white/50 hover:bg-white hover:border-gray-300 transition-all shadow-sm active:scale-98"
          >
            {/* Avatar image frame */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#112A22] text-[#10B981] rounded-full flex items-center justify-center font-bold text-sm shadow-inner">
              {user?.name?.charAt(0).toUpperCase() || 'M'}
            </div>
            
            {/* Minimal metadata text hidden on tiny mobile, nice on larger mobile */}
            <div className="hidden xs:flex flex-col text-left max-w-[80px]">
              <p className="text-xs font-bold text-gray-900 truncate">{user?.name || 'Maya'}</p>
            </div>
            <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
          </button>

          {/* Premium Glass Contextual Dropdown */}
          {showDropdown && (
            <>
              {/* Overlay listener to shut window on backdrop clicks */}
              <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)} />
              
              <div className="absolute right-0 mt-2 w-52 bg-white/90 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-1.5 z-20 animate-in fade-in slide-in-from-top-2 duration-150">
                <Link 
                  href="/profile" 
                  onClick={() => setShowDropdown(false)}
                  className="flex items-center gap-2 px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  View Profile
                </Link>
                <Link 
                  href="/settings" 
                  onClick={() => setShowDropdown(false)}
                  className="sm:hidden flex items-center gap-2 px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  Settings
                </Link>
                <Link 
                  href="/alerts" 
                  onClick={() => setShowDropdown(false)}
                  className="sm:hidden flex items-center gap-2 px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  Notifications
                </Link>
                <div className="h-px bg-gray-100 my-1" />
                <button 
                  onClick={() => {
                    setShowDropdown(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors text-left"
                >
                  <LogOut size={16} /> Log Out
                </button>
              </div>
            </>
          )}
        </div>

      </div>
    </header>
  );
}


export function MobileNav() {
  const pathname = usePathname();
  const { user } = useAuthStore();

  const isActive = (path: string) => 
    pathname === path 
      ? 'text-[#10B981] bg-[#112A22]/10 scale-105 shadow-sm' 
      : 'text-gray-500 hover:text-[#112A22]';

  return (
    <>
      {/* Floating Container */}
      <div className="md:hidden fixed bottom-6 inset-x-0 mx-4 z-50">
        <nav className="w-full bg-brand-dark/40 backdrop-blur-xl saturate-150 border border-white/40 rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] px-4 py-0">
          {/* Using a relative wrapper to anchor our absolute centered layout */}
          <div className="flex justify-between items-center h-14 relative">
            
            {/* Dashboard Tab */}
            <Link 
              href="/dashboard" 
              className={`flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 ${isActive('/dashboard')}`}
            >
              <LayoutGrid size={22} className={pathname === '/dashboard' ? 'fill-[#10B981]/20' : 'text-white/50'} />
            </Link>
            
            {/* Map Tab */}
            <Link 
              href="/map" 
              className={`flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 ${isActive('/map')}`}
            >
              <Compass size={22} className={pathname === '/map' ? 'fill-[#10B981]/20' : 'text-white/50'}/>
            </Link>

            

            <div className="absolute left-1/2 -translate-x-1/2  flex items-center justify-center">
              <Link 
                href="/create-gig"
                // className="w-16 h-16 bg-[#10B981] rounded-[22px] flex items-center justify-center shadow-[0_10px_25px_rgba(16,185,129,0.4)] text-[#112A22] transform hover:scale-105 active:scale-95 transition-all duration-200 border-4"
                className="w-16 h-16 bg-[#10B981] rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30 text-[#112A22] transform hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <Plus size={32} strokeWidth={3} />
              </Link>
            </div>

            {/* Empty invisible spacer so the distribution math keeps Left items and Right items balanced */}
            <div className="w-16" style={{ pointerEvents: 'none' }} />

            {/* Chat Tab */}
            <Link 
              href="/chat" 
              className={`flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 relative ${isActive('/chat')}`}
            >
              <MessageSquare size={22} className={pathname === '/chat' ? 'fill-[#10B981]/20' : 'text-white/50'}/>
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white/80" />
            </Link>

            {/* Profile Tab */}
            {/* <Link 
              // href={`/profile/${user?.id || 'me'}`} 
              href={'/profile'} 
              className={`flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 ${pathname.startsWith('/profile') ? 'text-[#10B981] bg-[#112A22]/10 scale-110' : 'text-gray-500'}`}
            >
              <User size={22} className={pathname === '/profile' ? 'fill-[#10B981]/20' : 'text-white/50'}/>
            </Link> */}

            {/* Wallet Tab */}
            <Link 
              href="/wallet" 
              className={`flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 ${isActive('/map')}`}
            >
              <Wallet size={22} className={pathname === '/map' ? 'fill-[#10B981]/20' : 'text-white/50'}/>
            </Link>
            
          </div>
        </nav>
      </div>

      {/* Safety Bottom Buffer */}
      <div className="md:hidden h-28" />
    </>
  );
}