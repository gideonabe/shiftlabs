'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { apiClient } from '@/app/api/client';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Calendar, 
  Zap,
  BookOpen,
  Package,
  Camera,
  Brush,
  DollarSign
} from 'lucide-react';

const CATEGORIES = [
  { id: 'Quick Errands', icon: Zap },
  { id: 'Tutoring', icon: BookOpen },
  { id: 'Heavy Lifting', icon: Package },
  { id: 'Event Staff', icon: Clock },
  { id: 'Photography', icon: Camera },
  { id: 'Design & Tech', icon: Brush },
];

export default function CreateGigPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    budget: '',
    duration: '',
    location: '',
    skills: '',
    deadline: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await apiClient.createGig({
        ...formData,
        budget: Number(formData.budget),
        skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
      });
      router.push('/dashboard');
    } catch (error) {
      console.error('Failed to create gig:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 sm:px-10 py-10 pb-32">
      
      {/* ==================== HEADER ==================== */}
      <div className="mb-10">
        <button
          onClick={() => router.push('/dashboard')}
          className="flex items-center gap-2 text-gray-500 hover:text-[#112A22] mb-6 font-medium transition-colors"
        >
          <ArrowLeft size={18} /> Back to feed
        </button>
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-[#112A22]">
          Post a Shift.
        </h1>
        <p className="text-gray-500 mt-2 font-medium">
          Drop your request into the local campus network.
        </p>
      </div>

      <motion.form 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        onSubmit={handleSubmit} 
        className="space-y-12"
      >
        
        {/* ==================== SECTION 1: WHAT ==================== */}
        <section className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-[#112A22] uppercase tracking-widest mb-2">
              The Basics
            </label>
            <input
              type="text"
              placeholder="e.g., Need a Python tutor before midterms"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="w-full bg-white border border-gray-200/80 rounded-2xl px-5 py-4 text-lg font-medium text-[#112A22] focus:border-[#10B981] focus:ring-4 focus:ring-[#10B981]/10 transition-all outline-none placeholder:text-gray-400"
            />
          </div>

          <div>
            <textarea
              placeholder="Describe exactly what you need done. Be specific about requirements..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={4}
              className="w-full bg-white border border-gray-200/80 rounded-2xl px-5 py-4 text-base text-[#112A22] focus:border-[#10B981] focus:ring-4 focus:ring-[#10B981]/10 transition-all outline-none placeholder:text-gray-400 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-3">
              Select Category
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isSelected = formData.category === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, category: cat.id })}
                    className={`flex items-center gap-3 p-4 rounded-2xl border transition-all text-left ${
                      isSelected 
                      ? 'border-[#10B981] bg-emerald-50/50 text-[#112A22] shadow-[0_4px_14px_0_rgba(16,185,129,0.1)]' 
                      : 'border-gray-200/80 bg-white text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    <Icon size={20} className={isSelected ? 'text-[#10B981]' : 'text-gray-400'} />
                    <span className="font-semibold text-sm">{cat.id}</span>
                  </button>
                );
              })}
            </div>
            {/* Hidden required input for form validation */}
            <input type="text" value={formData.category} required className="hidden" readOnly />
          </div>
        </section>

        {/* ==================== SECTION 2: LOGISTICS ==================== */}
        <section className="space-y-6 pt-6 border-t border-gray-100">
          <label className="block text-sm font-bold text-[#112A22] uppercase tracking-widest mb-2">
            Where & When
          </label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <MapPin size={20} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Location (e.g., North Library)"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
                className="w-full bg-white border border-gray-200/80 rounded-2xl py-4 pl-12 pr-5 text-base font-medium text-[#112A22] focus:border-[#10B981] focus:ring-4 focus:ring-[#10B981]/10 transition-all outline-none placeholder:text-gray-400"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Clock size={20} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Duration (e.g., 2 hours)"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                required
                className="w-full bg-white border border-gray-200/80 rounded-2xl py-4 pl-12 pr-5 text-base font-medium text-[#112A22] focus:border-[#10B981] focus:ring-4 focus:ring-[#10B981]/10 transition-all outline-none placeholder:text-gray-400"
              />
            </div>

            <div className="relative md:col-span-2">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Calendar size={20} className="text-gray-400" />
              </div>
              <input
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                required
                className="w-full bg-white border border-gray-200/80 rounded-2xl py-4 pl-12 pr-5 text-base font-medium text-[#112A22] focus:border-[#10B981] focus:ring-4 focus:ring-[#10B981]/10 transition-all outline-none text-gray-500"
              />
            </div>
          </div>
        </section>

        {/* ==================== SECTION 3: THE BAG (PAYMENT) ==================== */}
        <section className="space-y-6 pt-6 border-t border-gray-100">
          <label className="block text-sm font-bold text-[#112A22] uppercase tracking-widest mb-2">
            The Bag
          </label>
          
          <div className="bg-[#112A22] rounded-[2rem] p-8 text-white relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#10B981] rounded-full blur-[60px] opacity-20 pointer-events-none" />
            
            <div className="relative z-10">
              <p className="text-white/70 font-medium mb-4">Set your escrow budget</p>
              <div className="flex items-center gap-2">
                <span className="text-5xl font-black text-[#10B981]">$</span>
                <input
                  type="number"
                  placeholder="0.00"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  required
                  min="5"
                  className="bg-transparent border-none text-5xl font-black text-white focus:outline-none focus:ring-0 w-full placeholder:text-white/20 p-0"
                />
              </div>
              <p className="text-sm text-white/50 mt-4 flex items-center gap-2">
                <Zap size={14} className="text-[#10B981]" /> Funds are held securely until the task is complete.
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">
              Target Skills (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g., Python, Figma, Heavy Lifting (comma separated)"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              className="w-full bg-white border border-gray-200/80 rounded-2xl px-5 py-4 text-base font-medium text-[#112A22] focus:border-[#10B981] focus:ring-4 focus:ring-[#10B981]/10 transition-all outline-none placeholder:text-gray-400"
            />
          </div>
        </section>

        {/* ==================== FOOTER ACTIONS ==================== */}
        <div className="pt-8 flex flex-col sm:flex-row items-center gap-4 border-t border-gray-100">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto flex-1 bg-[#10B981] text-[#112A22] px-8 py-4 rounded-full text-lg font-bold hover:bg-[#0ea573] transition-all shadow-[0_0_40px_rgba(16,185,129,0.2)] disabled:opacity-70 flex items-center justify-center gap-2 active:scale-95"
          >
            {isLoading ? 'Processing...' : 'Fund Escrow & Post Shift'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/dashboard')}
            className="w-full sm:w-auto px-8 py-4 rounded-full text-lg font-bold text-gray-500 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
        </div>
      </motion.form>
    </div>
  );
}