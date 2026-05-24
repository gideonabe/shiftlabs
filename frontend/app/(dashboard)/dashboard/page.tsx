'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Clock, AlertCircle, Wallet, Plus, 
  ChevronRight, ShieldCheck, TrendingUp
} from 'lucide-react';

// ==================== MOCK DATA ====================
const mockUser = {
  id: 'u-1',
  name: 'Maya Chen',
  role: 'student',
  balance: 1248.50,
  escrow: 320.00,
  earnedThisWeek: 762.00,
  trustScore: 94
};

const mockGigs = [
  {
    id: 'g-1',
    title: 'Move delivery boxes to North Hall dorms',
    location: 'North Hall Quad',
    duration: '45 mins',
    budget: 35,
    category: 'Heavy Lifting',
    urgency: 'ASAP'
  },
  {
    id: 'g-2',
    title: 'Python CS101 Debugging Session',
    location: 'Main Library - Floor 3',
    duration: '1.5 hours',
    budget: 60,
    category: 'Tutoring',
    urgency: 'Standard'
  },
  {
    id: 'g-3',
    title: 'Setup sound gear for student gallery show',
    location: 'Fine Arts Pavilion',
    duration: '3 hours',
    budget: 90,
    category: 'Event Staff',
    urgency: 'Standard'
  },
  {
    id: 'g-4',
    title: 'Coffee & Red Bull run to engineering building',
    location: 'Engineering Campus',
    duration: '20 mins',
    budget: 15,
    category: 'Quick Errands',
    urgency: 'ASAP'
  }
];

export default function DashboardPage() {
  const router = useRouter();
  
  // Use mock data instead of global store for testing
  const user = mockUser;
  const [gigs, setGigs] = useState<any[]>([]);
  const [category, setCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  // API fetch delay
  useEffect(() => {
    const fetchMockData = () => {
      setIsLoading(true);
      setTimeout(() => {
        // Filter logic based on active category
        const filtered = category === 'All' 
          ? mockGigs 
          : mockGigs.filter(g => g.category === category);
        
        setGigs(filtered);
        setIsLoading(false);
      }, 800); // 800ms artificial delay to show loaders
    };

    fetchMockData();
  }, [category]); // Re-run when category changes

  const categories = ['All', 'Quick Errands', 'Tutoring', 'Heavy Lifting', 'Event Staff', 'Tech'];

  return (
    <div className="max-w-[1600px] mx-auto px-6 sm:px-10 py-10 pb-32 md:pb-12">
      
      {/* ==================== HEADER ==================== */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-gray-500 font-medium mb-1 tracking-wide">
            Good afternoon, {user.name.split(' ')[0]}
          </p>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-[#112A22]">
            Let's make some money.
          </h1>
        </div>
        
        {/* Primary Action */}
        <button 
          onClick={() => router.push('/create-gig')}
          className="bg-[#112A22] text-white px-6 py-3.5 rounded-full font-medium hover:bg-[#1c4236] transition-all flex items-center gap-2 shadow-sm w-fit"
        >
          <Plus size={18} /> Post a new gig
        </button>
      </div>

      {/* ==================== STATS OVERVIEW ==================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {/* Hero Stat - Dark Mode */}
        <div className="bg-[#112A22] p-7 rounded-3xl text-white relative overflow-hidden flex flex-col justify-between min-h-[160px]">
          <div className="flex justify-between items-start">
            <p className="text-white/60 text-sm font-medium">Available Balance</p>
            <Wallet size={20} className="text-[#10B981]" />
          </div>
          <div>
            <h2 className="text-4xl font-medium tracking-tight mb-1">${user.balance.toFixed(2)}</h2>
            <p className="text-[#10B981] text-sm font-medium flex items-center gap-1">
              <TrendingUp size={14} /> +$142 today
            </p>
          </div>
        </div>
        
        {/* Stat 2 */}
        <div className="bg-white border border-gray-200/60 p-7 rounded-3xl flex flex-col justify-between min-h-[160px] hover:border-gray-300 transition-colors">
          <div className="flex justify-between items-start">
            <p className="text-gray-500 text-sm font-medium">In Escrow</p>
            <Clock size={20} className="text-gray-400" />
          </div>
          <div>
            <h2 className="text-4xl font-medium text-[#112A22] tracking-tight mb-1">${user.escrow.toFixed(2)}</h2>
            <p className="text-gray-500 text-sm font-medium">2 shifts pending completion</p>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-white border border-gray-200/60 p-7 rounded-3xl flex flex-col justify-between min-h-[160px] hover:border-gray-300 transition-colors">
          <div className="flex justify-between items-start">
            <p className="text-gray-500 text-sm font-medium">This Week</p>
            <TrendingUp size={20} className="text-gray-400" />
          </div>
          <div>
            <h2 className="text-4xl font-medium text-[#112A22] tracking-tight mb-1">${user.earnedThisWeek.toFixed(2)}</h2>
            <p className="text-[#10B981] text-sm font-medium">+18% vs last week</p>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="bg-emerald-50/50 border border-emerald-100/50 p-7 rounded-3xl flex flex-col justify-between min-h-[160px]">
          <div className="flex justify-between items-start">
            <p className="text-[#112A22]/60 text-sm font-medium">Trust Score</p>
            <ShieldCheck size={20} className="text-[#10B981]" />
          </div>
          <div>
            <h2 className="text-4xl font-medium text-[#112A22] tracking-tight mb-1">{user.trustScore}</h2>
            <p className="text-[#112A22] text-sm font-medium">Top 5% on campus</p>
          </div>
        </div>
      </div>

      {/* ==================== MAIN FEED & ACTIVITY ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* LEFT COLUMN: LIVE FEED */}
        <div className="lg:col-span-2 flex flex-col h-full">
          
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-medium text-[#112A22] flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10B981]"></span>
              </span>
              Live near campus
            </h3>
          </div>

          {/* Minimal Filter Pills */}
          <div className="flex overflow-x-auto no-scrollbar gap-2 pb-4 mb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === cat 
                  ? 'bg-[#112A22] text-white' 
                  : 'bg-white border border-gray-200/60 text-gray-600 hover:border-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Feed List */}
          <div className="flex-1">
            {isLoading ? (
              // Clean Skeleton
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-28 bg-white/50 border border-gray-100 rounded-3xl animate-pulse" />
                ))}
              </div>
            ) : gigs.length === 0 ? (
              // Empty State
              <div className="border border-gray-200 border-dashed rounded-3xl p-16 text-center">
                <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-[#112A22] mb-1">It's quiet right now</h3>
                <p className="text-gray-500 text-sm">No active shifts match your filters.</p>
              </div>
            ) : (
              // The Gigs
              <motion.div className="space-y-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <AnimatePresence>
                  {gigs.map((gig, index) => (
                    <motion.div
                      key={gig.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => router.push(`/gig/${gig.id}`)}
                      className="group bg-white p-6 rounded-3xl border border-gray-200/60 hover:border-gray-300 transition-all cursor-pointer flex flex-col sm:flex-row gap-5 items-start sm:items-center relative overflow-hidden"
                    >
                      {/* Gig Metadata / Left */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-medium text-[#112A22] truncate group-hover:text-[#10B981] transition-colors">
                            {gig.title}
                          </h3>
                          {gig.urgency === 'ASAP' && (
                            <span className="bg-red-50 text-red-600 text-[10px] font-bold uppercase px-2 py-0.5 rounded-md tracking-widest shrink-0">
                              ASAP
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1.5">
                            <MapPin size={14} className="text-gray-400" /> {gig.location}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock size={14} className="text-gray-400" /> {gig.duration}
                          </span>
                        </div>
                      </div>

                      {/* Gig Price / Right */}
                      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto mt-2 sm:mt-0 pt-4 sm:pt-0 border-t border-gray-100 sm:border-0">
                        <div className="text-2xl font-medium text-[#112A22]">${gig.budget}</div>
                        <div className="text-sm font-medium text-gray-400 opacity-0 group-hover:opacity-100 flex items-center transition-opacity hidden sm:flex">
                          View details <ChevronRight size={14} className="ml-1" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: QUICK ACTIONS & ACTIVITY */}
        <div className="w-full h-fit space-y-8">
          
          {/* Quick Tasks */}
          <div>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Workspace</h3>
            <div className="space-y-3">
              <button 
                onClick={() => router.push('/active-shifts')}
                className="w-full flex items-center justify-between p-5 rounded-3xl bg-white border border-gray-200/60 hover:border-gray-300 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-[#112A22]">
                    <Clock size={18} />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-[#112A22]">Active Shifts</p>
                    <p className="text-xs text-gray-500 mt-0.5">1 currently in progress</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-gray-400 group-hover:text-[#112A22] transition-colors" />
              </button>

              <button 
                onClick={() => router.push('/applications')}
                className="w-full flex items-center justify-between p-5 rounded-3xl bg-white border border-gray-200/60 hover:border-gray-300 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-[#112A22]">
                    <ShieldCheck size={18} />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-[#112A22]">Applications</p>
                    <p className="text-xs text-gray-500 mt-0.5">3 pending review</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-gray-400 group-hover:text-[#112A22] transition-colors" />
              </button>
            </div>
          </div>

          {/* Activity Feed */}
          <div>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Recent Activity</h3>
            <div className="bg-white border border-gray-200/60 rounded-3xl p-6">
              <div className="space-y-6">
                
                {/* Activity Item 1 */}
                <div className="flex gap-4">
                  <div className="w-2 h-2 bg-[#10B981] rounded-full mt-2 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-[#112A22]">New gig matching your skills</p>
                    <p className="text-sm text-gray-500 mt-1">CS101 Tutoring session requested at North Library.</p>
                    <p className="text-xs text-gray-400 mt-2">2 mins ago</p>
                  </div>
                </div>
                
                <div className="h-px w-full bg-gray-100" />

                {/* Activity Item 2 */}
                <div className="flex gap-4">
                  <div className="w-2 h-2 bg-gray-300 rounded-full mt-2 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-[#112A22]">Payment Released</p>
                    <p className="text-sm text-gray-500 mt-1">$45.00 cleared escrow for "Event Setup".</p>
                    <p className="text-xs text-gray-400 mt-2">Yesterday</p>
                  </div>
                </div>

              </div>
              <button className="w-full mt-6 text-sm font-medium text-[#112A22] hover:text-[#10B981] transition-colors text-left">
                View all activity &rarr;
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}