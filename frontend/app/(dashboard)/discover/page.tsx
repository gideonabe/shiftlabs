'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Search, 
  TrendingUp, 
  MapPin, 
  Clock, 
  ChevronRight, 
  Sparkles,
  BookOpen,
  Package,
  Camera,
  Coffee,
  Star
} from 'lucide-react';

// Mock Data
const TRENDING_CATEGORIES = [
  { name: 'Tutoring', icon: BookOpen, color: 'bg-blue-50 text-blue-600', count: 24 },
  { name: 'Heavy Lifting', icon: Package, color: 'bg-orange-50 text-orange-600', count: 18 },
  { name: 'Photography', icon: Camera, color: 'bg-purple-50 text-purple-600', count: 9 },
  { name: 'Coffee Runs', icon: Coffee, color: 'bg-[#E7CBA9]/30 text-amber-800', count: 42 },
];

const SUGGESTED_GIGS = [
  { id: 'g-1', title: 'Need someone to review my React project', budget: 45, location: 'Virtual', duration: '1 hr', category: 'Tech' },
  { id: 'g-2', title: 'Pickup print orders from Student Union', budget: 15, location: 'Student Union', duration: '20 mins', category: 'Errands' },
  { id: 'g-3', title: 'Event setup assistance for Hackathon', budget: 120, location: 'Tech Pavilion', duration: '4 hrs', category: 'Event Staff' },
];

const TOP_EARNERS = [
  { id: 'u-2', name: 'David C.', role: 'Senior', earned: '$1.2k', rating: 5.0, initial: 'D' },
  { id: 'u-3', name: 'Sarah J.', role: 'Sophomore', earned: '$850', rating: 4.9, initial: 'S' },
  { id: 'u-4', name: 'Michael T.', role: 'Junior', earned: '$640', rating: 4.8, initial: 'M' },
];

export default function DiscoverPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="max-w-[1400px] mx-auto px-6 sm:px-10 py-10 pb-32 md:pb-12 space-y-12">
      
      {/* ==================== HEADER & SEARCH ==================== */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-[#112A22]">
            Discover.
          </h1>
          <p className="text-gray-500 mt-2 font-medium">
            Explore trending gigs and top earners on campus.
          </p>
        </div>
      </div>

      {/* ==================== FEATURED BANNER ==================== */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#112A22] rounded-[2rem] p-8 sm:p-10 relative overflow-hidden shadow-2xl shadow-[#112A22]/10"
      >
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-[#10B981]/20 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-white mb-6 border border-white/20 uppercase tracking-widest">
            <Sparkles size={14} className="text-[#10B981]" /> Finals Week Demand
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
            Tutoring rates are up 25% this week.
          </h2>
          <p className="text-white/70 mb-8 font-medium">
            Students are actively looking for help with CS, Calculus, and Economics. Cash in on your expertise.
          </p>
          <button className="bg-[#10B981] text-[#112A22] px-8 py-3.5 rounded-full font-bold hover:bg-[#0ea573] transition-colors">
            Post a Tutoring Gig
          </button>
        </div>
      </motion.div>

      {/* ==================== CATEGORIES ==================== */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-[#112A22]">Trending Categories</h3>
          <button className="text-sm font-bold text-gray-400 hover:text-[#112A22]">View All</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {TRENDING_CATEGORIES.map((cat, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={cat.name}
              className="bg-white border border-gray-200/60 p-5 rounded-[1.5rem] hover:border-emerald-200 hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${cat.color}`}>
                <cat.icon size={20} />
              </div>
              <h4 className="font-bold text-[#112A22] group-hover:text-[#10B981] transition-colors">{cat.name}</h4>
              <p className="text-xs text-gray-500 font-medium mt-1">{cat.count} active shifts</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* ==================== SUGGESTED FOR YOU ==================== */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-[#112A22] flex items-center gap-2">
              <Sparkles size={20} className="text-[#10B981]" /> Selected for you
            </h3>
          </div>

          <div className="space-y-4">
            {SUGGESTED_GIGS.map((gig) => (
              <div 
                key={gig.id} 
                onClick={() => router.push(`/gig/${gig.id}`)}
                className="bg-white p-6 rounded-3xl border border-gray-200/60 hover:border-[#10B981]/50 hover:shadow-xl hover:shadow-[#10B981]/5 transition-all cursor-pointer flex flex-col sm:flex-row gap-5 items-start sm:items-center group"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-bold text-[#112A22] group-hover:text-[#10B981] transition-colors">{gig.title}</h4>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
                    <span className="flex items-center gap-1.5"><MapPin size={14} /> {gig.location}</span>
                    <span className="flex items-center gap-1.5"><Clock size={14} /> {gig.duration}</span>
                  </div>
                </div>
                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto mt-2 sm:mt-0 pt-4 sm:pt-0 border-t border-gray-100 sm:border-0">
                  <div className="text-2xl font-black text-[#10B981]">${gig.budget}</div>
                  <div className="text-sm font-bold text-gray-400 opacity-0 group-hover:opacity-100 flex items-center transition-opacity hidden sm:flex">
                    View details <ChevronRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==================== TOP EARNERS LEADERBOARD ==================== */}
        <div className="bg-white border border-gray-200/60 rounded-[2rem] p-6 h-fit">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-[#112A22] flex items-center gap-2">
              <TrendingUp size={18} className="text-[#10B981]" /> Top Earners
            </h3>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">This Month</span>
          </div>

          <div className="space-y-4">
            {TOP_EARNERS.map((user, index) => (
              <div key={user.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer" onClick={() => router.push(`/profile/${user.id}`)}>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-[#112A22]">
                      {user.initial}
                    </div>
                    {/* Rank Badge */}
                    <div className={`absolute -top-1 -left-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black text-white border-2 border-white ${index === 0 ? 'bg-[#D4AF37]' : index === 1 ? 'bg-[#C0C0C0]' : 'bg-[#CD7F32]'}`}>
                      {index + 1}
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#112A22]">{user.name}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                      <Star size={10} className="text-[#10B981] fill-[#10B981]" /> {user.rating}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-[#10B981]">{user.earned}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 text-sm font-bold text-gray-400 hover:text-[#112A22] transition-colors py-3">
            View full leaderboard
          </button>
        </div>

      </div>
    </div>
  );
}