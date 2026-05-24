'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  MapPin, 
  MessageSquare, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Award,
  Zap,
  Briefcase,
  GraduationCap,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';

// ==================== MOCK DATA ====================
const MOCK_PROFILE = {
  id: 'u-1',
  name: 'Maya Chen',
  role: 'Student • Junior',
  major: 'Computer Science & UI Design',
  bio: "Hey! I'm a Junior specializing in front-end development and design. I'm also highly organized and happy to help with event setups, campus tours, or quick heavy-lifting errands between classes.",
  rating: 4.9,
  gigs_completed: 34,
  completion_rate: 100,
  verified: true,
  joined: 'Aug 2024',
  location: 'Stanford Campus',
  skills: ['Python', 'Figma', 'Event Setup', 'Photography', 'Math Tutoring'],
  avatar: null, // Will trigger the initials fallback
  
  reviews: [
    { id: 1, author: 'Diego R.', rating: 5, date: '2 days ago', text: 'Maya was incredible. Set up the entire gallery space in under an hour and helped with the lighting.' },
    { id: 2, author: 'Sarah J.', rating: 5, date: '1 week ago', text: 'Super fast communication. Delivered the documents exactly when promised.' },
    { id: 3, author: 'Campus Retail Ops', rating: 4, date: '1 month ago', text: 'Great work redesigning our flyers. Very professional.' }
  ],

  past_shifts: [
    { id: 101, title: 'Move boxes to North Hall', budget: 35, date: 'Oct 12' },
    { id: 102, title: 'Intro to React Tutoring', budget: 60, date: 'Oct 08' },
    { id: 103, title: 'Event Staff: Tech Mixer', budget: 120, date: 'Sep 29' }
  ]
};

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'Overview' | 'Past Shifts' | 'Reviews'>('Overview');
  const profile = MOCK_PROFILE;

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32">
      
      {/* Top Bar */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-[#112A22] font-medium transition-colors w-fit bg-white px-4 py-2 rounded-full border border-gray-200/60 shadow-sm"
        >
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* ==================== LEFT: STICKY IDENTITY CARD ==================== */}
        <aside className="w-full lg:w-[380px] shrink-0 space-y-6">
          <div className="bg-white rounded-[2rem] p-8 border border-gray-200/60 shadow-sm sticky top-24">
            
            {/* Avatar & Basic Info */}
            <div className="flex flex-col items-center text-center mb-8">
              <div className="relative mb-4">
                <div className="w-32 h-32 rounded-full bg-[#112A22] flex items-center justify-center text-4xl font-black text-white shadow-xl shadow-[#112A22]/20">
                  {profile.name.charAt(0)}
                </div>
                {profile.verified && (
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-[#10B981] border-4 border-white rounded-full flex items-center justify-center text-white shadow-sm" title=".Edu Verified">
                    <CheckCircle2 size={14} strokeWidth={3} />
                  </div>
                )}
              </div>
              
              <h1 className="text-2xl font-bold text-[#112A22] tracking-tight">{profile.name}</h1>
              <p className="text-sm font-medium text-gray-500 mt-1">{profile.role}</p>
              
              <div className="flex items-center gap-1 bg-emerald-50 text-[#10B981] px-3 py-1.5 rounded-full text-sm font-bold mt-4 border border-emerald-100">
                <Star size={14} className="fill-current" /> {profile.rating.toFixed(1)} 
                <span className="text-emerald-700/50 ml-1 font-medium">({profile.reviews.length} reviews)</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-8">
              <button className="flex-1 bg-[#112A22] text-white py-3.5 rounded-xl font-bold hover:bg-[#1c4236] transition-all active:scale-95 shadow-lg shadow-[#112A22]/10 flex items-center justify-center gap-2">
                <Briefcase size={16} /> Hire
              </button>
              <button className="flex-1 bg-gray-50 border border-gray-200 text-[#112A22] py-3.5 rounded-xl font-bold hover:bg-gray-100 transition-all active:scale-95 flex items-center justify-center gap-2">
                <MessageSquare size={16} /> Chat
              </button>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
              <div className="text-center p-3 bg-gray-50 rounded-2xl">
                <p className="text-xl font-black text-[#112A22]">{profile.gigs_completed}</p>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">Gigs Done</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-2xl">
                <p className="text-xl font-black text-[#112A22]">{profile.completion_rate}%</p>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">Reliability</p>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 space-y-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Verifications</h3>
              <div className="flex items-center gap-3 text-sm font-medium text-[#112A22]">
                <ShieldCheck size={18} className="text-[#10B981]" /> University Email Confirmed
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-[#112A22]">
                <Award size={18} className="text-[#10B981]" /> Identity Verified
              </div>
            </div>

          </div>
        </aside>

        {/* ==================== RIGHT: DETAIL CONTENT (Tabs) ==================== */}
        <section className="flex-1 flex flex-col min-w-0">
          
          {/* Custom Tab Navigation */}
          <div className="bg-white rounded-2xl border border-gray-200/60 p-2 mb-6 flex overflow-x-auto no-scrollbar shadow-sm">
            {['Overview', 'Past Shifts', 'Reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`flex-1 min-w-[120px] py-3 text-sm font-bold rounded-xl transition-all ${
                  activeTab === tab 
                  ? 'bg-[#112A22] text-white shadow-md' 
                  : 'text-gray-500 hover:text-[#112A22] hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content Area */}
          <div className="bg-white rounded-[2rem] border border-gray-200/60 shadow-sm min-h-[500px] overflow-hidden">
            <AnimatePresence mode="wait">
              
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'Overview' && (
                <motion.div 
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="p-8 sm:p-10 space-y-10"
                >
                  <div>
                    <h2 className="text-xl font-bold text-[#112A22] mb-4">About</h2>
                    <p className="text-gray-600 leading-relaxed text-base">
                      {profile.bio}
                    </p>
                  </div>

                  <div className="h-px bg-gray-100" />

                  <div>
                    <h2 className="text-xl font-bold text-[#112A22] mb-4">Academic Context</h2>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                          <GraduationCap size={20} />
                        </div>
                        <div>
                          <p className="font-semibold text-[#112A22]">{profile.major}</p>
                          <p className="text-sm text-gray-500">Major / Focus</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                          <MapPin size={20} />
                        </div>
                        <div>
                          <p className="font-semibold text-[#112A22]">{profile.location}</p>
                          <p className="text-sm text-gray-500">Primary Campus</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-gray-100" />

                  <div>
                    <h2 className="text-xl font-bold text-[#112A22] mb-4">Verified Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-4 py-2 bg-gray-50 border border-gray-200 text-[#112A22] text-sm font-semibold rounded-xl"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: PAST SHIFTS */}
              {activeTab === 'Past Shifts' && (
                <motion.div 
                  key="shifts"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-8 sm:p-10 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-[#112A22]">Shift Ledger</h2>
                    <p className="text-sm text-gray-500 mt-1">A history of successfully completed gigs.</p>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {profile.past_shifts.map((shift) => (
                      <div key={shift.id} className="p-6 sm:px-10 hover:bg-gray-50 transition-colors flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-[#10B981]">
                            <Zap size={20} className="fill-[#10B981]/20" />
                          </div>
                          <div>
                            <p className="font-bold text-[#112A22]">{shift.title}</p>
                            <p className="text-xs text-gray-500 mt-1 font-medium flex items-center gap-1">
                              <Clock size={12} /> {shift.date}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-black text-[#10B981]">${shift.budget}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* TAB 3: REVIEWS */}
              {activeTab === 'Reviews' && (
                <motion.div 
                  key="reviews"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-8 sm:p-10 border-b border-gray-100 flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-[#112A22]">Peer Reviews</h2>
                      <p className="text-sm text-gray-500 mt-1">Feedback from the campus community.</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-black text-[#112A22]">{profile.rating.toFixed(1)}</p>
                      <div className="flex text-[#10B981] justify-end mt-1">
                        {[1,2,3,4,5].map(i => <Star key={i} size={12} className="fill-current" />)}
                      </div>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {profile.reviews.map((review) => (
                      <div key={review.id} className="p-8 sm:px-10">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-[#112A22]">
                              {review.author.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-sm text-[#112A22]">{review.author}</p>
                              <p className="text-xs text-gray-500">{review.date}</p>
                            </div>
                          </div>
                          <div className="flex text-[#10B981]">
                            {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} className="fill-current" />)}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed ml-13 pl-13">
                          "{review.text}"
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </section>
      </div>
    </div>
  );
}