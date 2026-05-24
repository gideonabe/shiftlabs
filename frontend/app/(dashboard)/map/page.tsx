'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  MapPin, 
  Search, 
  SlidersHorizontal, 
  Zap, 
  Clock, 
  Navigation, 
  Compass, 
  ChevronRight,
  Maximize2
} from 'lucide-react';

// Production Mock Dataset for Campus Area
const INITIAL_GIGS = [
  {
    id: 'g-1',
    title: 'Move delivery boxes to North Hall dorms',
    category: 'Quick Errands',
    budget: 35,
    duration: '45 mins',
    location: 'North Hall Quad',
    coordinates: { top: '32%', left: '45%' },
    urgency: 'ASAP'
  },
  {
    id: 'g-2',
    title: 'Python CS101 Debugging Session',
    category: 'Tutoring',
    budget: 60,
    duration: '1.5 hours',
    location: 'Main Library - Floor 3',
    coordinates: { top: '55%', left: '62%' },
    urgency: 'Scheduled'
  },
  {
    id: 'g-3',
    title: 'Setup sound gear for student gallery show',
    category: 'Event Staff',
    budget: 90,
    duration: '3 hours',
    location: 'Fine Arts Pavilion',
    coordinates: { top: '22%', left: '28%' },
    urgency: 'Scheduled'
  },
  {
    id: 'g-4',
    title: 'Urgent final exam study support notes copy',
    category: 'Tutoring',
    budget: 25,
    duration: '30 mins',
    location: 'Science Complex Lab B',
    coordinates: { top: '68%', left: '38%' },
    urgency: 'ASAP'
  }
];

export default function MapPage() {
  const [selectedGigId, setSelectedGigId] = useState<string | null>('g-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Quick Errands', 'Tutoring', 'Event Staff'];
  const router = useRouter();

  // Filter Logic
  const filteredGigs = useMemo(() => {
    return INITIAL_GIGS.filter(gig => {
      const matchesSearch = gig.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            gig.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeFilter === 'All' || gig.category === activeFilter;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeFilter]);

  const currentSelectedGig = useMemo(() => {
    return INITIAL_GIGS.find(g => g.id === selectedGigId) || null;
  }, [selectedGigId]);

  return (
    <div className="w-full h-[calc(100vh-5rem)] flex flex-col md:flex-row bg-[#FAF9F6] overflow-hidden relative">
      
      {/* ==================== LEFT PANEL: VIEWPORT LIST ==================== */}
      <aside className="w-full md:w-[380px] lg:w-[420px] bg-white border-r border-gray-200/60 flex flex-col h-1/2 md:h-full z-10 relative shadow-sm">
        
        {/* Search Header Container */}
        <div className="p-5 border-b border-gray-100 space-y-4">
          <div className="relative group">
            <Search className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-[#112A22] transition-colors" size={16} />
            <input 
              type="text"
              placeholder="Search map viewport..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200/80 rounded-full py-3 pl-11 pr-4 text-sm font-medium outline-none focus:bg-white focus:border-[#10B981] focus:ring-4 focus:ring-[#10B981]/5 transition-all"
            />
          </div>

          {/* Inline Filter Pills */}
          <div className="flex overflow-x-auto no-scrollbar gap-1.5 pt-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  activeFilter === cat 
                    ? 'bg-[#112A22] text-white' 
                    : 'bg-gray-50 border border-gray-200/40 text-gray-500 hover:text-[#112A22]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Context List */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-2.5 bg-[#FAF9F6]/50">
          <div className="px-2 pb-1 flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-widest">
            <span>{filteredGigs.length} shifts found</span>
            <SlidersHorizontal size={14} className="text-gray-400 cursor-pointer hover:text-[#112A22]" />
          </div>

          {filteredGigs.map((gig) => {
            const isSelected = gig.id === selectedGigId;
            return (
              <div
                key={gig.id}
                onClick={() => setSelectedGigId(gig.id)}
                className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected 
                    ? 'bg-white border-[#10B981] shadow-xl shadow-[#10B981]/5' 
                    : 'bg-white border-gray-200/60 hover:border-gray-300'
                }`}
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-400">{gig.category}</span>
                      {gig.urgency === 'ASAP' && (
                        <span className="bg-red-50 text-red-600 text-[9px] font-black tracking-wider uppercase px-1.5 py-0.5 rounded">ASAP</span>
                      )}
                    </div>
                    <h4 className="font-semibold text-sm text-[#112A22] leading-snug line-clamp-2 transition-colors group-hover:text-[#10B981]">
                      {gig.title}
                    </h4>
                  </div>
                  <div className="text-xl font-black text-[#10B981]">${gig.budget}</div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50 text-xs text-gray-500 font-medium">
                  <span className="flex items-center gap-1"><MapPin size={12} className="text-gray-400"/> {gig.location}</span>
                  <span className="flex items-center gap-1"><Clock size={12} className="text-gray-400"/> {gig.duration}</span>
                </div>
              </div>
            );
          })}
        </div>
      </aside>

      {/* ==================== RIGHT PANEL: CUSTOM INTERACTIVE CANVAS ==================== */}
      <section className="flex-1 h-1/2 md:h-full relative bg-[#EFECE4] overflow-hidden">
        
        {/* Actual Spatial Grid Background System */}
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply bg-[linear-gradient(to_right,#112A22_1px,transparent_1px),linear-gradient(to_bottom,#112A22_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        
        {/* Premium Topographic Design Contours (Vector Emulation) */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 border border-[#112A22]/5 rounded-full pointer-events-none" />
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] border border-[#112A22]/5 rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-1/4 w-[700px] h-[700px] border border-[#112A22]/5 rounded-full pointer-events-none" />

        {/* Map Utility Floaters */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
          <button className="bg-white border border-gray-200 shadow-lg p-2.5 rounded-full text-[#112A22] hover:bg-gray-50 transition-colors">
            <Navigation size={16} className="fill-current" />
          </button>
          <button className="bg-white border border-gray-200 shadow-lg p-2.5 rounded-full text-gray-400 hover:text-[#112A22] transition-colors">
            <Compass size={16} />
          </button>
        </div>

        {/* ==================== INTERACTIVE VALUE TAG MARKERS ==================== */}
        {filteredGigs.map((gig) => {
          const isSelected = gig.id === selectedGigId;
          return (
            <div
              key={gig.id}
              className="absolute transition-transform duration-300"
              style={{ 
                top: gig.coordinates.top, 
                left: gig.coordinates.left,
                transform: 'translate(-50%, -50%)' 
              }}
            >
              {/* Premium Airbnb-style Spatial Value Tag */}
              <button
                onClick={() => setSelectedGigId(gig.id)}
                className={`relative px-3 py-1.5 rounded-full font-black text-xs tracking-tight transition-all duration-300 transform shadow-md flex items-center gap-1 ${
                  isSelected 
                    ? 'bg-[#112A22] text-white scale-110 z-20 shadow-emerald-900/10' 
                    : 'bg-white text-[#112A22] hover:scale-105 z-10 border border-gray-200'
                }`}
              >
                <span className={isSelected ? 'text-[#10B981]' : 'text-gray-400'}>$</span>
                {gig.budget}
                
                {/* Micro pointer triangle */}
                <div className={`absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 transform ${
                  isSelected ? 'bg-[#112A22]' : 'bg-white border-r border-b border-gray-200'
                }`} />
              </button>
            </div>
          );
        })}

        {/* ==================== FLOATING OVERLAY: FOCUS PREVIEW CARD ==================== */}
        <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 max-w-sm z-20">
          <AnimatePresence mode="wait">
            {currentSelectedGig && (
              <motion.div
                key={currentSelectedGig.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white p-5 rounded-[2rem] border border-gray-200/80 shadow-2xl flex flex-col justify-between"
              >
                <div className="flex justify-between items-start gap-4 mb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#10B981] bg-emerald-50 px-2 py-0.5 rounded">
                      Selected Node
                    </span>
                    <h3 className="font-bold text-base text-[#112A22] mt-2 leading-tight">
                      {currentSelectedGig.title}
                    </h3>
                  </div>
                  <div className="text-2xl font-black text-[#10B981]">
                    ${currentSelectedGig.budget}
                  </div>
                </div>

                <div className="space-y-2 py-3 border-y border-gray-100 text-xs font-medium text-gray-500">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-gray-400" />
                    <span>{currentSelectedGig.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-gray-400" />
                    <span>Est: {currentSelectedGig.duration} completion track</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4">
                  <button 
                    onClick={() => router.push(`/gig/${currentSelectedGig.id}`)}
                    className="flex-1 bg-[#112A22] text-white py-3 rounded-full text-xs font-bold hover:bg-[#1c4236] transition-colors flex items-center justify-center gap-1 group"
                  >
                    Review Target Details 
                    <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                  <button className="p-3 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-400 hover:text-[#112A22] transition-colors border border-gray-200/40">
                    <Maximize2 size={14} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </section>
    </div>
  );
}