'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SplashScreen } from '@/components/SplashScreen';
import { 
  ShieldCheck, 
  Wallet, 
  MapPin,
  CheckCircle2, 
  MessageCircle, 
  Zap, 
  GraduationCap, 
  ArrowRight,
  Package,
  BookOpen,
  Layers
} from 'lucide-react';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onLoadComplete={() => setShowSplash(false)} />;
  }

  return (
    <main className="min-h-screen bg-[#FAF9F6] text-[#131514] selection:bg-[#112A22] selection:text-white font-sans antialiased overflow-x-hidden">
      
      {/* ==================== NAVIGATION ==================== */}
      <nav className="absolute top-0 w-full z-40 px-6 py-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <Layers size={20} className="fill-current text-[#112A22]" strokeWidth={2} />
          <span className="font-bold text-xl tracking-tight text-[#112A22]">Shift Labs</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-black">
          <Link href="#how-it-works" className="hover:opacity-70 transition-opacity">How it Works</Link>
          <Link href="#trust" className="hover:opacity-70 transition-opacity">Trust & Safety</Link>
          <Link href="#campuses" className="hover:opacity-70 transition-opacity">Campuses</Link>
        </div>

        <div className='flex gap-6 items-center text-black font-medium text-sm'>
          <Link href={"/login"} className="hover:opacity-70 transition-opacity">
            Sign in
          </Link>
          <Link href={"/signup"}>
            <button className="bg-[#112A22] text-white px-5 py-2.5 rounded-full font-semibold hover:bg-[#1c4236] hover:scale-105 transition-all shadow-md shadow-[#112A22]/20">
              Join Network
            </button>
          </Link>
        </div>
      </nav>

      {/* ==================== HERO SECTION ==================== */}
      <section className="relative pt-48 pb-32 px-6 text-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-no-repeat bg-center bg-cover bg-[#E7CBA9]" 
          style={{ backgroundImage: "url('/shiftfooter.jpg')" }} 
        />
        {/* Soft overlay to ensure dark text remains readable over the image */}
        <div className="absolute inset-0 bg-[#FAF9F6]/85 backdrop-blur-[2px] z-0" />
        
        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 border border-gray-200/50 backdrop-blur-md text-sm font-medium text-[#112A22] mb-4"
          >
            <ShieldCheck size={16} /> .edu Verification Required
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-7xl font-medium tracking-tight text-[#112A22] leading-[1.05]"
          >
            Your campus has <br /> an economy.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-xl text-gray-700 max-w-2xl mx-auto"
          >
            The hyper-local gig network built exclusively for students. Find help fast, earn money between classes, and coordinate safely within your university.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link href="/signup">
              <button className="bg-[#112A22] text-white px-8 py-4 rounded-full font-medium hover:bg-[#1c4236] transition-colors flex items-center gap-2 w-full sm:w-auto justify-center group">
                Start Earning <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="/post-gig">
              <button className="bg-white/80 backdrop-blur-sm border border-gray-200 text-[#112A22] px-8 py-4 rounded-full font-medium hover:bg-white transition-colors w-full sm:w-auto justify-center">
                Hire a Student
              </button>
            </Link>
          </motion.div>

          <div className="pt-10 md:pt-20">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-widest mb-8">
              Active micro-economies at top universities
            </p>
            <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-40 font-serif">
              <span className="text-2xl font-bold">Stanford</span>
              <span className="text-2xl font-bold">NYU</span>
              <span className="text-2xl font-bold">UCLA</span>
              <span className="text-2xl font-bold">Michigan</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== STATS & FEATURES ==================== */}
      <section className="py-14 md:py-24 px-6 max-w-6xl mx-auto border-t border-gray-200/60" id="how-it-works">
        <div className="grid grid-cols-3 gap-12 mb-32">
          <div>
            <h3 className="text-3xl md:text-5xl font-light text-[#112A22] mb-2">15m</h3>
            <p className="text-gray-500 text-sm font-medium">Average time to fill a gig</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-5xl font-light text-[#112A22] mb-2">100%</h3>
            <p className="text-gray-500 text-sm font-medium">Verified student profiles</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-5xl font-light text-[#112A22] mb-2">$0</h3>
            <p className="text-gray-500 text-sm font-medium">Payment friction via Escrow</p>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-16 max-w-2xl">
            Unlike open marketplaces, Shift is built for speed and trust.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <MapPin size={28} strokeWidth={1.5} className="mb-4 text-[#112A22]" />
              <h4 className="text-lg font-semibold mb-2">Hyper-Local Matching</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Gigs are routed based on real-time location. Need an errand run across campus right now? Find someone walking that exact path.
              </p>
            </div>
            <div>
              <ShieldCheck size={28} strokeWidth={1.5} className="mb-4 text-[#112A22]" />
              <h4 className="text-lg font-semibold mb-2">.Edu Verification</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                No anonymous strangers. Every user is cryptographically tied to their active university ID and builds a verified public reputation.
              </p>
            </div>
            <div>
              <Wallet size={28} strokeWidth={1.5} className="mb-4 text-[#112A22]" />
              <h4 className="text-lg font-semibold mb-2">Instant Escrow</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Money is secured upfront and held in escrow. The exact second a gig is marked complete, funds are released to your wallet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== MASONRY TESTIMONIALS ==================== */}
      <section className="py-8 md:py-24 px-6 max-w-6xl mx-auto" id="trust">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-medium tracking-tight mb-4">Powered by the student network</h2>
          <p className="text-gray-500">Real gigs. Real money. Real students.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-auto md:h-[500px]">
          <div className="md:col-span-4 bg-[#EFECE4] rounded-3xl p-8 relative flex flex-col justify-between group overflow-hidden">
            <div>
              <div className="flex items-center gap-1 text-[#112A22] mb-4">
                {[1,2,3,4,5].map(i => <Zap key={i} size={16} className="fill-current" />)}
              </div>
              <h3 className="text-3xl font-medium text-[#112A22] leading-tight">
                "I make $150 a week just doing quick deliveries between my lectures."
              </h3>
            </div>
            <div className="mt-8">
              <p className="font-semibold text-[#112A22]">Michael T.</p>
              <p className="text-sm text-[#112A22]/70">Business Major, Year 2</p>
            </div>
          </div>
          
          <div className="md:col-span-4 bg-gradient-to-br from-[#112A22] to-[#1c4236] rounded-3xl p-8 text-white relative flex flex-col justify-end">
            <p className="font-medium text-lg">"We used to struggle finding reliable staff for campus events. Now we post on Shift and have 5 verified students ready in minutes."</p>
            <div className="mt-8">
              <p className="text-sm font-semibold">Sarah Jenkins</p>
              <p className="text-sm opacity-70">Director of Campus Ops</p>
            </div>
          </div>
          
          <div className="md:col-span-4 bg-[#A3B19B] rounded-3xl p-8 text-[#112A22] relative flex flex-col justify-center">
            <p className="font-medium text-xl leading-snug">"The escrow system is a game-changer. I know the money is locked in before I start coding or tutoring."</p>
            <div className="mt-8">
              <p className="text-sm font-semibold">David Chen</p>
              <p className="text-sm opacity-70">Computer Science, Year 4</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SYSTEM INFRASTRUCTURE (Flowchart) ==================== */}
      <section className="py-18 md:py-32 px-6 bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <div className="text-center  mb-10 md:mb-20 max-w-2xl">
            <h2 className="text-3xl font-medium tracking-tight mb-4">Zero friction from request to payout</h2>
            <p className="text-gray-500 text-sm">
              Our matching engine handles the logistics, communication, and payments seamlessly in the background.
            </p>
          </div>

          <div className="relative w-full max-w-4xl flex flex-col items-center justify-center py-10">
            {/* Structural Lines */}
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gray-200 border-dashed border-t" />
            
            {/* Horizontal Nodes */}
            <div className="flex justify-between items-center w-full relative z-10 flex-col md:flex-row gap-10 md:gap-0">
              <div className="bg-white border border-gray-200 px-6 py-3 rounded-full text-sm font-medium shadow-sm flex items-center gap-2">
                <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center text-xs">1</div> 
                Post a Gig
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#E7CBA9] to-[#A3B19B] rounded-[100px] blur-md opacity-40 scale-110" />
                <div className="bg-[#112A22] text-white px-10 py-6 rounded-[100px] text-xl font-medium shadow-xl relative z-10 flex items-center gap-3">
                  <Zap size={20} className="fill-current text-[#A3B19B]" />
                  Matching Engine
                </div>
              </div>

              <div className="bg-white border border-gray-200 px-6 py-3 rounded-full text-sm font-medium shadow-sm flex items-center gap-2">
                <CheckCircle2 size={18} className="text-[#112A22]" />
                Escrow Settlement
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== GIG FEED FEATURE ==================== */}
      <section className="py-4 md:py-24 px-6 max-w-6xl mx-auto">
        <span className="text-xs font-semibold bg-gray-100 px-3 py-1.5 rounded-full text-gray-600 mb-6 inline-block tracking-wide uppercase">
          Live Feed
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-3xl font-medium tracking-tight mb-4">Real opportunities, right next door.</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Browse a live, localized feed of tasks happening on your campus right now. From moving boxes to tutoring sessions, find work that fits your schedule.
            </p>
            
            <ul className="space-y-6">
              <li className="flex gap-4 items-start">
                <MessageCircle size={24} strokeWidth={1.5} className="text-[#112A22] shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">In-App Coordination</h4>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">Chat directly with employers or peers to coordinate dorm numbers and meeting spots without sharing your personal phone number.</p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <GraduationCap size={24} strokeWidth={1.5} className="text-[#112A22] shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Micro-Tasks & Errands</h4>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">Optimize your free time. Pick up a 30-minute gig during your lecture gap and get paid instantly.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Simulated App UI / Gig Feed */}
          <div className="bg-[#F1F0EA] rounded-[2.5rem] p-6 sm:p-10 flex items-center justify-center min-h-[500px]">
            <div className="bg-[#FAF9F6] rounded-3xl shadow-xl border border-gray-200 p-4 w-full max-w-sm flex flex-col gap-3">
              
              {/* Gig Card 1 */}
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-start">
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
                    <Package size={20} className="text-orange-600" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-sm text-gray-900">Move boxes to North Hall</h5>
                    <p className="text-xs text-gray-500 mt-1">0.2 miles away • Just now</p>
                    <span className="inline-block mt-2 bg-red-50 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide">Urgent</span>
                  </div>
                </div>
                <div className="font-bold text-[#112A22]">$30</div>
              </div>

              {/* Gig Card 2 */}
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-start">
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                    <BookOpen size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-sm text-gray-900">Python CS101 Tutoring</h5>
                    <p className="text-xs text-gray-500 mt-1">Campus Library • In 2 hours</p>
                  </div>
                </div>
                <div className="font-bold text-[#112A22]">$45</div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer 
        className="bg-no-repeat bg-center bg-cover text-white pt-24 pb-12 px-6 relative md:min-h-[80vh] flex flex-col" 
        style={{ backgroundImage: "url('/shiftfooter.jpg')" }}
      >
        <div className="absolute inset-0 bg-[#112A22]/65 z-0" />
        
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col h-full justify-between flex-grow w-full">
          
          <div className="mb-24 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">
              Ready to Shift?
            </h2>
            <p className="text-lg text-white/70 mb-8">
              Join the platform redefining how students earn, connect, and help their local communities.
            </p>
            <div className="flex gap-4">
              <Link href="/signup">
                <button className="bg-white text-[#112A22] px-8 py-3.5 rounded-full font-medium hover:bg-gray-100 transition-colors">
                  Join for free
                </button>
              </Link>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12 text-sm border-t border-white/10 pt-12">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Layers size={20} className="fill-current" strokeWidth={2} />
                  <span className="font-bold text-xl tracking-tight">Shift</span>
                </div>
              </div>
              
              <div>
                <h5 className="font-semibold mb-4 text-white/90">Platform</h5>
                <ul className="space-y-3 text-white/60">
                  <li><Link href="#" className="hover:text-white transition-colors">Find Gigs</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Post a Task</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Escrow Payments</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Trust & Safety</Link></li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-semibold mb-4 text-white/90">Community</h5>
                <ul className="space-y-3 text-white/60">
                  <li><Link href="#" className="hover:text-white transition-colors">Universities</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Local Businesses</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Student Ambassadors</Link></li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-semibold mb-4 text-white/90">Company</h5>
                <ul className="space-y-3 text-white/60">
                  <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-white/40 text-xs">
              <p>© {new Date().getFullYear()} Shift Technologies Inc.</p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
    </main>
  );
}