'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import { apiClient } from '@/app/api/client';
import { 
  ArrowLeft, 
  Bell, 
  Lock, 
  LogOut, 
  Trash2, 
  User, 
  ShieldCheck,
  Camera,
  CheckCircle2,
  AlertOctagon
} from 'lucide-react';

export default function SettingsPage() {
  const router = useRouter();
  const { user, logout, setUser } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security'>('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Mock initial state for design purposes
  const [formData, setFormData] = useState({
    name: user?.name || 'Maya Chen',
    bio: user?.bio || 'Computer Science junior with a focus on UI/UX.',
    email: user?.email || 'maya.chen@stanford.edu',
  });

  const [toggles, setToggles] = useState({
    email: true,
    sms: false,
    push: true,
    twoFactor: false
  });

  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      // const response = await apiClient.updateProfile(formData);
      // setUser(response.data);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  // Custom Toggle Component
  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <button 
      type="button"
      onClick={onChange}
      className={`relative w-12 h-6 rounded-full transition-colors duration-300 ease-in-out ${checked ? 'bg-[#10B981]' : 'bg-gray-200'}`}
    >
      <span className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 shadow-sm ${checked ? 'translate-x-6' : 'translate-x-0'}`} />
    </button>
  );

  return (
    <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-10 pb-32 md:pb-12">
      
      {/* ==================== HEADER ==================== */}
      <div className="mb-10">
        <button
          onClick={() => router.push('/dashboard')}
          className="flex items-center gap-2 text-gray-500 hover:text-[#112A22] mb-6 font-medium transition-colors w-fit"
        >
          <ArrowLeft size={18} /> Back to dashboard
        </button>
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-[#112A22]">
          Settings.
        </h1>
        <p className="text-gray-500 mt-2 font-medium">
          Manage your identity, preferences, and security.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        
        {/* ==================== LEFT: SIDEBAR NAV ==================== */}
        <aside className="w-full md:w-64 shrink-0">
          <nav className="flex flex-col gap-2">
            {[
              { id: 'profile', label: 'Profile Identity', icon: User },
              { id: 'notifications', label: 'Notifications', icon: Bell },
              { id: 'security', label: 'Security & Trust', icon: ShieldCheck },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl font-semibold transition-all text-sm ${
                    isActive 
                    ? 'bg-[#112A22] text-white shadow-md' 
                    : 'text-gray-500 hover:bg-white hover:text-[#112A22] border border-transparent hover:border-gray-200/60'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-[#10B981]' : ''} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* ==================== RIGHT: CONTENT PANELS ==================== */}
        <div className="flex-1 max-w-3xl">
          <AnimatePresence mode="wait">
            
            {/* PANEL: PROFILE */}
            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                <div className="bg-white border border-gray-200/60 rounded-[2rem] p-8 sm:p-10 shadow-sm">
                  <h2 className="text-2xl font-bold text-[#112A22] mb-8">Public Identity</h2>
                  
                  {/* Avatar Upload Simulation */}
                  <div className="flex items-center gap-6 mb-10">
                    <div className="relative group cursor-pointer">
                      <div className="w-24 h-24 bg-[#112A22] rounded-full flex items-center justify-center text-3xl font-black text-white shadow-lg overflow-hidden">
                        {formData.name.charAt(0)}
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Camera size={24} className="text-white" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-[#112A22]">Profile Photo</h3>
                      <p className="text-sm text-gray-500 mt-1 mb-3">Square image, up to 5MB.</p>
                      <button className="text-sm font-bold text-[#112A22] bg-gray-50 hover:bg-gray-100 border border-gray-200 px-4 py-2 rounded-full transition-colors">
                        Upload Image
                      </button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200/80 rounded-2xl px-5 py-3.5 text-base font-medium text-[#112A22] focus:bg-white focus:border-[#10B981] focus:ring-4 focus:ring-[#10B981]/10 transition-all outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center justify-between">
                        <span>University Email</span>
                        <span className="flex items-center gap-1 text-[#10B981] normal-case tracking-normal">
                          <CheckCircle2 size={14} /> Verified
                        </span>
                      </label>
                      <div className="w-full bg-gray-100 border border-gray-200/80 rounded-2xl px-5 py-3.5 text-base font-medium text-gray-500 cursor-not-allowed flex items-center gap-3">
                        <Lock size={16} className="text-gray-400" />
                        {formData.email}
                      </div>
                      <p className="text-xs text-gray-400 mt-2 font-medium">To change your verified .edu email, please contact campus support.</p>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Bio</label>
                      <textarea
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        rows={4}
                        className="w-full bg-gray-50 border border-gray-200/80 rounded-2xl px-5 py-3.5 text-base font-medium text-[#112A22] focus:bg-white focus:border-[#10B981] focus:ring-4 focus:ring-[#10B981]/10 transition-all outline-none resize-none"
                      />
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex justify-end">
                      <button
                        onClick={handleSaveProfile}
                        disabled={isLoading}
                        className="bg-[#112A22] text-white px-8 py-3.5 rounded-full font-bold hover:bg-[#1c4236] transition-all shadow-lg shadow-[#112A22]/10 disabled:opacity-70 flex items-center gap-2 active:scale-95"
                      >
                        {isLoading ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* PANEL: NOTIFICATIONS */}
            {activeTab === 'notifications' && (
              <motion.div
                key="notifications"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-white border border-gray-200/60 rounded-[2rem] p-8 sm:p-10 shadow-sm">
                  <h2 className="text-2xl font-bold text-[#112A22] mb-8">Notification Preferences</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-5 border border-gray-100 rounded-2xl hover:border-emerald-100 hover:bg-emerald-50/30 transition-colors">
                      <div>
                        <p className="font-bold text-[#112A22]">Push Notifications</p>
                        <p className="text-sm text-gray-500 mt-1">Receive alerts for nearby gigs and instant messages.</p>
                      </div>
                      <Toggle checked={toggles.push} onChange={() => setToggles(p => ({...p, push: !p.push}))} />
                    </div>

                    <div className="flex items-center justify-between p-5 border border-gray-100 rounded-2xl hover:border-emerald-100 hover:bg-emerald-50/30 transition-colors">
                      <div>
                        <p className="font-bold text-[#112A22]">Email Digests</p>
                        <p className="text-sm text-gray-500 mt-1">Daily summaries of top gigs on your campus.</p>
                      </div>
                      <Toggle checked={toggles.email} onChange={() => setToggles(p => ({...p, email: !p.email}))} />
                    </div>

                    <div className="flex items-center justify-between p-5 border border-gray-100 rounded-2xl hover:border-emerald-100 hover:bg-emerald-50/30 transition-colors">
                      <div>
                        <p className="font-bold text-[#112A22]">SMS Alerts</p>
                        <p className="text-sm text-gray-500 mt-1">Text messages when funds clear escrow.</p>
                      </div>
                      <Toggle checked={toggles.sms} onChange={() => setToggles(p => ({...p, sms: !p.sms}))} />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* PANEL: SECURITY */}
            {activeTab === 'security' && (
              <motion.div
                key="security"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                <div className="bg-white border border-gray-200/60 rounded-[2rem] p-8 sm:p-10 shadow-sm">
                  <h2 className="text-2xl font-bold text-[#112A22] mb-8">Security & Access</h2>
                  
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 border border-gray-100 rounded-2xl">
                      <div>
                        <p className="font-bold text-[#112A22]">Password</p>
                        <p className="text-sm text-gray-500 mt-1">Last changed 3 months ago.</p>
                      </div>
                      <button className="bg-gray-50 border border-gray-200 text-[#112A22] px-5 py-2.5 rounded-full font-bold hover:bg-gray-100 transition-colors text-sm">
                        Update Password
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-5 border border-gray-100 rounded-2xl hover:border-emerald-100 hover:bg-emerald-50/30 transition-colors">
                      <div>
                        <p className="font-bold text-[#112A22]">Two-Factor Authentication (2FA)</p>
                        <p className="text-sm text-gray-500 mt-1">Add an extra layer of security to your wallet.</p>
                      </div>
                      <Toggle checked={toggles.twoFactor} onChange={() => setToggles(p => ({...p, twoFactor: !p.twoFactor}))} />
                    </div>
                  </div>
                </div>

                {/* DANGER ZONE */}
                <div className="bg-red-50/50 border border-red-100 rounded-[2rem] p-8 sm:p-10">
                  <h2 className="text-xl font-bold text-red-700 mb-6 flex items-center gap-2">
                    <AlertOctagon size={20} /> Danger Zone
                  </h2>
                  
                  <div className="space-y-4">
                    <button 
                      onClick={handleLogout}
                      className="w-full bg-white border border-red-200 text-red-600 px-6 py-4 rounded-2xl font-bold hover:bg-red-50 transition-colors flex items-center justify-between"
                    >
                      Sign Out of Shift
                      <LogOut size={18} />
                    </button>
                    <button 
                      onClick={() => setShowDeleteConfirm(true)}
                      className="w-full bg-red-600 text-white px-6 py-4 rounded-2xl font-bold hover:bg-red-700 transition-colors flex items-center justify-between"
                    >
                      Permanently Delete Account
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>

      {/* ==================== DELETE MODAL ==================== */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl"
            >
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-6">
                <AlertOctagon size={24} />
              </div>
              <h3 className="text-2xl font-bold text-[#112A22] mb-3">Delete Account?</h3>
              <p className="text-gray-500 mb-8 font-medium leading-relaxed">
                This action cannot be undone. All your gig history, reviews, and escrow data will be permanently wiped from the campus network.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 bg-gray-100 text-[#112A22] py-3.5 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  className="flex-1 bg-red-600 text-white py-3.5 rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
                >
                  Confirm Deletion
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}