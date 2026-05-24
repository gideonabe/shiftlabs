'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Mail, Lock, User, ArrowLeft, AlertCircle, Layers, ShieldCheck, TrendingUp } from 'lucide-react';

// export const dynamic = 'force-dynamic';

export default function SignupPage() {
  // Mock static form state for safe prerendering
  const [formData, setFormData] = useState({
    email: 'maya@university.edu',
    password: 'password123',
    name: 'Maya Chen',
    role: 'student' as 'student' | 'employer',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setErrorState] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('Mock signup submitted:', formData);
    // Simulate success
    setTimeout(() => {
      setIsLoading(false);
      setErrorState(null);
      alert('Signup mocked successfully! (No API call made.)');
    }, 800);
    router.push('/login')
  };

  return (
    <div className="min-h-screen flex bg-[#FAF9F6] selection:bg-[#112A22] selection:text-white font-sans">
      
      {/* ==================== LEFT: FORM PANEL ==================== */}
      <div className="w-full lg:w-[45%] xl:w-[40%] flex flex-col justify-between px-8 sm:px-16 lg:px-20 py-12 relative z-10">
        
        {/* Top Header / Back Link */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#112A22] transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to website
          </Link>
        </motion.div>

        {/* Form Container */}
        <div className="w-full max-w-md mx-auto mt-12 mb-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-8">
              <Layers size={28} className="text-[#112A22] fill-current" strokeWidth={1.5} />
              <span className="text-2xl font-bold text-[#112A22] tracking-tight">Shift</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#112A22] mb-3">
              Join the network
            </h1>
            <p className="text-gray-500 text-sm">
              Create your account to start earning or hiring on campus.
            </p>
          </motion.div>

          <motion.form 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleSubmit} 
            className="space-y-5"
          >
            {/* Premium Role Selector */}
            <div className="flex p-1 bg-white border border-gray-200 rounded-xl relative shadow-sm">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, role: 'student' }))}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 z-10 ${
                  formData.role === 'student' ? 'text-white' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, role: 'employer' }))}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 z-10 ${
                  formData.role === 'employer' ? 'text-white' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Employer
              </button>
              
              {/* Sliding Background Indicator */}
              <div 
                className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[#112A22] rounded-lg transition-transform duration-300 ease-out shadow-sm ${
                  formData.role === 'employer' ? 'translate-x-full' : 'translate-x-0'
                }`}
              />
            </div>

            <div className="space-y-4">
              <Input
                label="Full Name"
                type="text"
                placeholder={formData.role === 'student' ? "Jane Doe" : "Business Name / Contact"}
                leftIcon={<User size={18} className="text-gray-400" />}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-white border-gray-200 focus:border-[#112A22] focus:ring-[#112A22]/10 transition-all"
              />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={formData.role}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Input
                    label={formData.role === 'student' ? "University Email" : "Business Email"}
                    type="email"
                    placeholder={formData.role === 'student' ? "name@university.edu" : "contact@company.com"}
                    leftIcon={<Mail size={18} className="text-gray-400" />}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-white border-gray-200 focus:border-[#112A22] focus:ring-[#112A22]/10 transition-all"
                  />
                </motion.div>
              </AnimatePresence>
              
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                leftIcon={<Lock size={18} className="text-gray-400" />}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="bg-white border-gray-200 focus:border-[#112A22] focus:ring-[#112A22]/10 transition-all"
              />
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-red-50 text-red-600 text-sm p-3 rounded-lg flex items-start gap-2 border border-red-100"
              >
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </motion.div>
            )}

            <div className="pt-2">
              <Button 
                type="submit" 
                fullWidth 
                isLoading={isLoading}
                className="bg-[#112A22] text-white hover:bg-[#1a3f33] h-12 text-base font-medium transition-all shadow-lg shadow-[#112A22]/10"
              >
                Create Account
              </Button>
            </div>

            <div className="text-center text-sm text-gray-500 pt-6">
              Already have an account?{' '}
              <Link href="/login" className="text-[#112A22] font-semibold hover:underline decoration-2 underline-offset-4">
                Sign in here
              </Link>
            </div>
          </motion.form>
        </div>

        {/* Simple Footer */}
        <div className="text-xs text-gray-400 mt-8">
          © {new Date().getFullYear()} Shift Technologies Inc.
        </div>
      </div>

      {/* ==================== RIGHT: BRANDING PANEL ==================== */}
      <div className="hidden lg:flex lg:w-[55%] xl:w-[60%] relative bg-[#112A22] overflow-hidden">
        {/* Background Painted Image */}
        <div 
          className="absolute inset-0 bg-no-repeat bg-center bg-cover mix-blend-luminosity opacity-40 scale-105 -scale-x-105"
          style={{ backgroundImage: "url('/shifthero.jpg')" }}
        /> 
        {/* Gradient overlay to ensure text pops */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#112A22]/70 via-[#112A22]/50 to-transparent" />

        {/* Branding Content */}
        <div className="relative z-10 w-full h-full flex flex-col justify-end p-16 lg:p-24 text-white">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-xl"
          >
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-medium text-white mb-6">
                <ShieldCheck size={14} /> Trust-Focused Ecosystem
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-medium leading-[1.1] mb-6 text-white/95 tracking-tight">
                Your campus has an economy. <br /> Tap in.
              </h2>
              
              <p className="text-lg text-white/70 mb-10 leading-relaxed max-w-md">
                Join thousands of verified students turning their free time into income, and local businesses finding reliable help instantly.
              </p>
            </div>

            {/* Subtle Platform Features */}
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                  <ShieldCheck size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white mb-1">.Edu Verification</p>
                  <p className="text-xs text-white/60 leading-relaxed">Cryptographically tied to active university IDs.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                  <TrendingUp size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white mb-1">Instant Escrow</p>
                  <p className="text-xs text-white/60 leading-relaxed">Funds are secured upfront and paid instantly.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
    </div>
  );
}