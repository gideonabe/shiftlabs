import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { TopHeader, MobileNav } from '@/components/DashboardShell';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#FAF9F6] text-[#131514] font-sans selection:bg-[#10B981] selection:text-white overflow-hidden">
      
      {/* 1. Persistent Desktop Sidebar */}
      <Sidebar />

      {/* 2. Main Content Wrapper */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative w-full">
        
        {/* Persistent Top Search/Header */}
        <TopHeader />
        
        {/* 3. The specific page (e.g., /dashboard, /map, /wallet) renders here */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar">
          {children}
        </main>
      </div>

      {/* 4. Persistent Mobile Bottom Navigation */}
      <MobileNav />
      
    </div>
  );
}