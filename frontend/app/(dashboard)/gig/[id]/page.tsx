'use client'

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import { useGigStore } from '@/store/gigStore';
import { apiClient } from '@/app/api/client';
import { 
  MapPin, 
  Clock, 
  ArrowLeft, 
  MessageSquare, 
  ShieldCheck, 
  Zap,
  CheckCircle2,
  Calendar,
  Briefcase,
  Star
} from 'lucide-react';

// ==================== MOCK DATA ====================
const MOCK_GIG = {
  id: 'g-1',
  title: 'Move delivery boxes to North Hall dorms',
  category: 'Heavy Lifting',
  description: "Hey! I'm moving into North Hall and have about 8 heavy boxes arriving at the campus mailroom. I need someone strong to help me carry them to the 3rd floor (no elevator). Should take about 45 minutes tops. I have a dolly you can use.",
  budget: 35.00,
  duration: '45 mins',
  location: 'Campus Mailroom -> North Hall',
  deadline: 'Today, 4:00 PM',
  urgency: 'ASAP' as const,
  skills: ['Heavy Lifting', 'Punctuality'],
  applicants: 3,
  status: 'open' as const,
  createdAt: new Date().toISOString(),
  employer: {
    id: 'u-99',
    name: 'Sarah Jenkins',
    avatar: undefined,
    rating: 4.9,
    verified: true,
    joined: 'Sep 2023'
  }
};

export default function GigDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  
  // Using auth store (mocking role for testing, change to actual user role)
  const { user } = useAuthStore(); 
  const currentUserRole = user?.role || 'student'; // Fallback to student for demo
  
  const { selectedGig, setSelectedGig } = useGigStore();
  const [isLoading, setIsLoading] = useState(true);
  const [coverLetter, setCoverLetter] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    fetchGigDetails();
  }, [id]);

  const fetchGigDetails = async () => {
    setIsLoading(true);
    try {
      // PRESERVED API LOGIC:
      // if (id) {
      //   const response = await apiClient.getGig(id);
      //   setSelectedGig(response.data);
      // }
      
      // MOCK LOGIC FOR UI DEV:
      setTimeout(() => {
        setSelectedGig(MOCK_GIG);
        setIsLoading(false);
      }, 800);
    } catch (error) {
      console.error('Failed to fetch gig:', error);
      setIsLoading(false);
    }
  };

  const handleApply = async () => {
    if (!selectedGig || !coverLetter.trim()) return;

    setIsApplying(true);
    try {
      // PRESERVED API LOGIC:
      // await apiClient.applyToGig(selectedGig.id, coverLetter);
      
      // MOCK LOGIC:
      setTimeout(() => {
        setHasApplied(true);
        setCoverLetter('');
        setIsApplying(false);
      }, 1000);
    } catch (error) {
      console.error('Failed to apply:', error);
      setIsApplying(false);
    }
  };

  const handleContact = async () => {
    if (!selectedGig) return;
    try {
      // PRESERVED API LOGIC:
      // const response = await apiClient.createConversation(selectedGig.employer.id);
      // router.push(`/chat/${response.data.id}`);
      
      // MOCK LOGIC:
      router.push(`/chat/mock-id`);
    } catch (error) {
      console.error('Failed to create conversation:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-10 animate-pulse space-y-8">
        <div className="w-32 h-6 bg-gray-200 rounded-full" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-64 bg-gray-200 rounded-[2rem] w-full" />
            <div className="h-40 bg-gray-200 rounded-[2rem] w-full" />
          </div>
          <div className="h-96 bg-gray-200 rounded-[2rem] w-full" />
        </div>
      </div>
    );
  }

  if (!selectedGig) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Briefcase size={32} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-[#112A22] mb-2">Shift not found</h2>
        <p className="text-gray-500 mb-6">This gig may have been deleted or already filled.</p>
        <button 
          onClick={() => router.push('/dashboard')}
          className="bg-[#112A22] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#1c4236] transition-colors"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-8 pb-32">
      
      {/* Back Button */}
      <motion.button
        onClick={() => router.push('/dashboard')}
        className="flex items-center gap-2 text-gray-500 hover:text-[#112A22] mb-8 font-medium transition-colors w-fit bg-white px-4 py-2 rounded-full border border-gray-200/60 shadow-sm"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <ArrowLeft size={16} /> Back to feed
      </motion.button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* ==================== LEFT: MAIN DETAILS ==================== */}
        <motion.div 
          className="lg:col-span-2 space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          
          {/* Header Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold text-[#112A22] bg-gray-100 px-3 py-1.5 rounded-full uppercase tracking-widest">
                {selectedGig.category}
              </span>
              {selectedGig.urgency === 'ASAP' && (
                <span className="text-[10px] font-black text-red-600 bg-red-50 px-2.5 py-1.5 rounded-md uppercase tracking-wider flex items-center gap-1">
                  <Zap size={12} className="fill-current" /> {selectedGig.urgency}
                </span>
              )}
            </div>
            <h1 className="text-4xl sm:text-5xl font-medium text-[#112A22] tracking-tight leading-[1.1] mb-8">
              {selectedGig.title}
            </h1>
            
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="bg-white border border-gray-200/60 p-5 rounded-[1.5rem] flex flex-col justify-center">
                <MapPin size={20} className="text-[#10B981] mb-2" />
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Location</p>
                <p className="font-semibold text-[#112A22] truncate">{selectedGig.location}</p>
              </div>
              <div className="bg-white border border-gray-200/60 p-5 rounded-[1.5rem] flex flex-col justify-center">
                <Clock size={20} className="text-[#10B981] mb-2" />
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Duration</p>
                <p className="font-semibold text-[#112A22]">{selectedGig.duration}</p>
              </div>
              <div className="bg-white border border-gray-200/60 p-5 rounded-[1.5rem] flex flex-col justify-center col-span-2 sm:col-span-1">
                <Calendar size={20} className="text-[#10B981] mb-2" />
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Deadline</p>
                <p className="font-semibold text-[#112A22]">{selectedGig.deadline}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white border border-gray-200/60 rounded-[2rem] p-8 sm:p-10">
            <h3 className="text-xl font-bold text-[#112A22] mb-4">About this Shift</h3>
            <p className="text-gray-600 leading-relaxed text-base">
              {selectedGig.description}
            </p>

            {selectedGig.skills && selectedGig.skills.length > 0 && (
              <div className="mt-8 pt-8 border-t border-gray-100">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedGig.skills.map((skill: string) => (
                    <span key={skill} className="px-4 py-2 bg-gray-50 border border-gray-200/80 text-[#112A22] text-sm font-semibold rounded-xl">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Employer Profile Snippet */}
          <div className="bg-[#FAF9F6] border border-gray-200/60 rounded-[2rem] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                {selectedGig.employer.avatar ? (
                  <img src={selectedGig.employer.avatar} alt="Employer" className="w-14 h-14 rounded-full object-cover shadow-sm" />
                ) : (
                  <div className="w-14 h-14 bg-[#112A22] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-sm">
                    {selectedGig.employer.name.charAt(0)}
                  </div>
                )}
                {selectedGig.employer.verified && (
                  <div className="absolute -bottom-1 -right-1 bg-[#10B981] rounded-full border-2 border-[#FAF9F6] text-white">
                    <CheckCircle2 size={12} />
                  </div>
                )}
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Posted By</p>
                <h4 className="font-bold text-[#112A22] text-lg">{selectedGig.employer.name}</h4>
                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium mt-0.5">
                  <span className="flex items-center text-[#10B981]"><Star size={12} className="fill-current mr-1"/> {selectedGig.employer.rating}</span>
                  <span>•</span>
                  <span>Joined {selectedGig.employer.joined}</span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={handleContact}
              className="w-full sm:w-auto bg-white border border-gray-200 text-[#112A22] px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare size={18} /> Message
            </button>
          </div>

        </motion.div>

        {/* ==================== RIGHT: STICKY ACTION PANEL ==================== */}
        <motion.div 
          className="lg:col-span-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="bg-white border border-gray-200/60 rounded-[2rem] p-6 sm:p-8 sticky top-24 shadow-xl shadow-black/[0.02]">
            
            {/* Price Tag */}
            <div className="mb-8">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Escrow Payout</p>
              <div className="flex items-end gap-1">
                <span className="text-3xl font-bold text-[#10B981] mb-1">$</span>
                <span className="text-5xl font-black text-[#112A22] tracking-tight">{selectedGig.budget.toFixed(2)}</span>
              </div>
            </div>

            {/* Contextual Rendering based on Role */}
            {currentUserRole === 'employer' ? (
              // EMPLOYER VIEW
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 mb-6">
                  <p className="text-sm text-gray-500 font-medium mb-1">Active Applicants</p>
                  <p className="text-3xl font-black text-[#112A22]">{selectedGig.applicants}</p>
                </div>
                <button className="w-full bg-[#112A22] text-white py-4 rounded-xl font-bold hover:bg-[#1c4236] transition-colors shadow-lg shadow-[#112A22]/10 active:scale-95">
                  Review Applications
                </button>
                <button className="w-full bg-white border border-gray-200 text-[#112A22] py-4 rounded-xl font-bold hover:bg-gray-50 transition-colors">
                  Edit Shift Details
                </button>
              </div>
            ) : (
              // STUDENT VIEW (Applicant)
              <AnimatePresence mode="wait">
                {hasApplied ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center"
                  >
                    <div className="w-12 h-12 bg-[#10B981] rounded-full flex items-center justify-center text-white mx-auto mb-4 shadow-md shadow-emerald-500/20">
                      <CheckCircle2 size={24} />
                    </div>
                    <h3 className="font-bold text-[#112A22] text-lg mb-2">Request Sent!</h3>
                    <p className="text-sm text-gray-600 font-medium">
                      The employer has been notified. You'll receive an alert if you are selected for this shift.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-sm font-bold text-[#112A22] mb-2">Quick Pitch</label>
                      <textarea
                        placeholder="Why are you the right fit for this shift? Keep it brief..."
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        rows={4}
                        className="w-full bg-gray-50 border border-gray-200/80 rounded-2xl px-4 py-3 text-sm font-medium text-[#112A22] focus:bg-white focus:border-[#10B981] focus:ring-4 focus:ring-[#10B981]/10 transition-all outline-none resize-none placeholder:text-gray-400"
                      />
                    </div>
                    
                    <button
                      onClick={handleApply}
                      disabled={!coverLetter.trim() || isApplying}
                      className="w-full bg-[#10B981] text-[#112A22] py-4 rounded-2xl font-bold hover:bg-[#0ea573] transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-95 text-lg"
                    >
                      {isApplying ? 'Submitting...' : 'Request this Shift'}
                    </button>

                    <div className="flex items-center justify-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest pt-4">
                      <ShieldCheck size={16} /> Escrow Protected
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}

          </div>
        </motion.div>

      </div>
    </div>
  );
}