'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Mail, Lock, ArrowLeft, AlertCircle, ShieldCheck, Zap, Layers } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { apiClient } from '@/app/api/client';

export default function LoginPage() {
  const router = useRouter();
  const { setUser, setToken, setError, clearError } = useAuthStore();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setErrorState] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        setToken(token);
      }
    }
  }, []);
  
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    clearError();
    setErrorState(null);

    // Basic client-side .edu validation for UX
    if (!formData.email.toLowerCase().endsWith('.edu')) {
      setErrorState('A valid .edu university email is required to access Shift.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await apiClient.login(formData.email, formData.password);
      const { access_token: token, user } = response.data;
      
      setToken(token);
      setUser(user);
      router.push('/dashboard');
    } catch (err: any) {
      const message = err.response?.data?.detail || 'Login failed. Please verify your credentials.';
      setError(message);
      setErrorState(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white selection:bg-[#10B981] selection:text-white font-sans">
      
      {/* ==================== LEFT: FORM PANEL ==================== */}
      <div className="w-full lg:w-[45%] flex flex-col justify-between px-8 sm:px-16 lg:px-20 py-10 relative z-10">
        
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to campus
          </Link>
        </motion.div>

        <div className="w-full max-w-md mx-auto mt-12 mb-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="mb-10"
          >
            <div className="flex items-center gap-2 mb-8">
              <Layers size={16} className="text-[#10B981] fill-[#10B981]" />
              {/* <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              </div> */}
              <span className="text-2xl font-bold tracking-tight">Shift</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-3">
              Enter your campus.
            </h1>
            <p className="text-gray-500 text-sm font-medium">
              Sign in with your verified university email to access the local gig network.
            </p>
          </motion.div>

          <motion.form 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            onSubmit={handleSubmit} 
            className="space-y-5"
          >
            <div className="space-y-4">
              <Input
                label="University Email"
                type="email"
                placeholder="student@university.edu"
                leftIcon={<Mail size={18} className="text-gray-400" />}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-gray-50 border-gray-200 focus:border-black focus:ring-black/5"
              />
              
              <div className="space-y-1">
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  leftIcon={<Lock size={18} className="text-gray-400" />}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="bg-gray-50 border-gray-200 focus:border-black focus:ring-black/5"
                />
                <div className="flex justify-end pt-1">
                  <Link href="/forgot-password" className="text-xs font-semibold text-gray-500 hover:text-black transition-colors">
                    Forgot password?
                  </Link>
                </div>
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                className="bg-red-50 text-red-600 text-sm p-3 rounded-xl flex items-start gap-2 border border-red-100"
              >
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span className="font-medium">{error}</span>
              </motion.div>
            )}

            <div className="pt-2">
              <Button 
                type="submit" 
                fullWidth 
                isLoading={isLoading}
                className="bg-brand-dark cursor-pointer text-white hover:bg-[#1a2b25] h-12 text-base font-bold rounded-xl transition-all shadow-lg active:scale-[0.98]"
              >
                Access Network
              </Button>
            </div>

            <div className="text-center text-sm text-gray-500 pt-6">
              New to Shift?{' '}
              <Link href="/signup" className="text-black font-bold hover:underline decoration-2 underline-offset-4">
                Verify your student ID
              </Link>
            </div>
          </motion.form>
        </div>
      </div>

      {/* ==================== RIGHT: BRANDING PANEL ==================== */}
      <div className="hidden lg:flex lg:w-[55%] relative bg-gray-50 p-6">
        <div className="w-full h-full bg-brand-dark rounded-[2rem] overflow-hidden relative flex flex-col justify-between p-12">
          
          {/* Abstract Topographic/Spatial Background (Uber-esque map vibe) */}
          <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.5)_100%)]" />
             <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
               <defs>
                 <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                   <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" opacity="0.5"/>
                 </pattern>
               </defs>
               <rect width="100%" height="100%" fill="url(#grid)" />
             </svg>
          </div>

          <div className="relative z-10 flex items-center gap-2 bg-white/20 backdrop-blur-md w-fit px-4 py-2 rounded-full border border-white/30 text-white font-medium text-sm">
            <ShieldCheck size={18} /> 100% University Verified
          </div>

          <div className="relative z-10 max-w-lg">
            <h2 className="text-5xl font-black text-white leading-[1.1] mb-6 tracking-tight">
              Earn. Help. Connect.
            </h2>
            <p className="text-emerald-50 text-xl font-medium mb-10 leading-relaxed">
              "I made $85 yesterday just moving boxes across campus and doing a quick tutoring session between classes. The money hits my account instantly."
            </p>
            
            <div className="flex items-center gap-4 bg-black/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10 w-fit">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-xl font-bold text-emerald-600">
                JD
              </div>
              <div>
                <p className="font-bold text-white">James D.</p>
                <p className="text-emerald-100 text-sm font-medium">Computer Science, Class of '26</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}