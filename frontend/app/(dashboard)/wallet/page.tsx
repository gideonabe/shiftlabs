'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiClient } from '@/app/api/client';
import { 
  DollarSign, 
  TrendingUp, 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft, 
  ShieldCheck, 
  Wallet as WalletIcon,
  Lock,
  ArrowRight,
  X
} from 'lucide-react';

export default function WalletPage() {
  const [wallet, setWallet] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [addAmount, setAddAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    fetchWallet();
  }, []);

  const fetchWallet = async () => {
    try {
      const response = await apiClient.getWallet();
      setWallet(response.data);
    } catch (error) {
      console.error('Failed to fetch wallet:', error);
      // Fallback mock data for design testing if API fails
      setWallet({
        balance: 1248.50,
        total_earned: 3450.00,
        total_spent: 450.00,
        escrow: 320.00,
        transactions: [
          { id: '1', description: 'Gig Payout: Python Tutoring', amount: 45.00, created_at: new Date().toISOString() },
          { id: '2', description: 'Funded Escrow: North Hall Move', amount: -35.00, created_at: new Date(Date.now() - 86400000).toISOString() },
          { id: '3', description: 'Deposit from Bank ending in ••42', amount: 100.00, created_at: new Date(Date.now() - 172800000).toISOString() },
        ]
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddFunds = async () => {
    if (!addAmount || isNaN(Number(addAmount))) return;
    setIsProcessing(true);
    try {
      await apiClient.addFunds(Number(addAmount), 'card');
      setAddAmount('');
      setShowAddFunds(false);
      fetchWallet();
    } catch (error) {
      console.error('Failed to add funds:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-6 sm:px-10 py-10 animate-pulse space-y-8">
        <div className="h-10 bg-gray-200 rounded-lg w-1/4" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-64 bg-gray-200 rounded-[2rem]" />
          <div className="h-64 bg-gray-200 rounded-[2rem]" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 sm:px-10 py-10 pb-32 md:pb-12">
      
      {/* ==================== HEADER ==================== */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-[#112A22]">
          Your Wallet.
        </h1>
        <p className="text-gray-500 mt-2 font-medium">
          Manage your gig earnings, active escrows, and payouts.
        </p>
      </div>

      {/* ==================== TOP SECTION: CARD & STATS ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        
        {/* The "Digital Card" (Main Balance) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#112A22] rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-[#112A22]/20 flex flex-col justify-between min-h-[280px]"
        >
          {/* Abstract glows */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#10B981] rounded-full blur-[80px] opacity-20 pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-white rounded-full blur-[80px] opacity-5 pointer-events-none" />
          
          <div className="relative z-10 flex justify-between items-start">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <ShieldCheck size={14} className="text-[#10B981]" />
              <span className="text-xs font-bold tracking-widest uppercase">Verified Funds</span>
            </div>
            <WalletIcon size={24} className="text-white/50" />
          </div>

          <div className="relative z-10 mt-12">
            <p className="text-white/60 text-sm font-medium mb-2">Available to Cash Out</p>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-medium text-white/50 mb-1.5">$</span>
              <h2 className="text-6xl font-medium tracking-tight">
                {wallet?.balance.toFixed(2).split('.')[0]}
                <span className="text-3xl text-white/50">.{wallet?.balance.toFixed(2).split('.')[1]}</span>
              </h2>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats & Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col gap-6"
        >
          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setShowAddFunds(true)}
              className="bg-[#10B981] text-[#112A22] py-4 rounded-2xl font-bold hover:bg-[#0ea573] transition-colors flex flex-col items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95"
            >
              <Plus size={24} />
              Add Funds
            </button>
            <button 
              className="bg-white border border-gray-200 text-[#112A22] py-4 rounded-2xl font-bold hover:bg-gray-50 transition-colors flex flex-col items-center justify-center gap-2 active:scale-95"
            >
              <ArrowUpRight size={24} />
              Cash Out
            </button>
          </div>

          {/* Secondary Stats */}
          <div className="grid grid-cols-2 gap-4 flex-1">
            <div className="bg-white border border-gray-200/60 rounded-2xl p-5 flex flex-col justify-center">
              <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center mb-3 text-gray-400">
                <Lock size={18} />
              </div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">In Escrow</p>
              <p className="text-2xl font-medium text-[#112A22]">${wallet?.escrow?.toFixed(2) || '0.00'}</p>
            </div>
            
            <div className="bg-white border border-gray-200/60 rounded-2xl p-5 flex flex-col justify-center">
              <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center mb-3 text-[#10B981]">
                <TrendingUp size={18} />
              </div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Total Earned</p>
              <p className="text-2xl font-medium text-[#112A22]">${wallet?.total_earned?.toFixed(2) || '0.00'}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ==================== INLINE ADD FUNDS FORM ==================== */}
      <AnimatePresence>
        {showAddFunds && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: 'auto', marginBottom: 48 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white border border-emerald-500/30 rounded-3xl p-6 sm:p-8 relative">
              <button 
                onClick={() => setShowAddFunds(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-900"
              >
                <X size={20} />
              </button>
              
              <h3 className="text-xl font-bold text-[#112A22] mb-6">Deposit Funds to Shift</h3>
              
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-full sm:w-1/2 relative bg-gray-50 rounded-2xl p-4 flex items-center focus-within:ring-2 focus-within:ring-[#10B981] transition-all">
                  <span className="text-3xl font-black text-[#10B981] mr-2">$</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={addAmount}
                    onChange={(e) => setAddAmount(e.target.value)}
                    className="w-full bg-transparent text-4xl font-black text-[#112A22] outline-none placeholder:text-gray-300"
                    autoFocus
                  />
                </div>
                
                <button
                  onClick={handleAddFunds}
                  disabled={!addAmount || isProcessing}
                  className="w-full sm:w-1/2 bg-[#112A22] text-white py-6 rounded-2xl font-bold hover:bg-[#1c4236] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? 'Processing Securely...' : 'Confirm Deposit'} <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================== TRANSACTION HISTORY ==================== */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-medium text-[#112A22]">Recent Transactions</h3>
          <button className="text-sm font-bold text-[#10B981] hover:underline">Download CSV</button>
        </div>

        <div className="bg-white border border-gray-200/60 rounded-3xl overflow-hidden">
          {wallet?.transactions && wallet.transactions.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {wallet.transactions.map((tx: any) => {
                const isIncoming = tx.amount > 0;
                return (
                  <div key={tx.id} className="p-5 sm:p-6 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                    <div className="flex items-center gap-4">
                      {/* Icon Indicator */}
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                        isIncoming ? 'bg-emerald-50 text-[#10B981]' : 'bg-gray-100 text-[#112A22]'
                      }`}>
                        {isIncoming ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                      </div>
                      
                      {/* Details */}
                      <div>
                        <p className="font-semibold text-[#112A22] text-sm sm:text-base line-clamp-1">
                          {tx.description}
                        </p>
                        <p className="text-xs text-gray-500 mt-1 font-medium">
                          {new Date(tx.created_at).toLocaleDateString('en-US', { 
                            month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Amount */}
                    <div className={`text-lg font-bold ${isIncoming ? 'text-[#10B981]' : 'text-[#112A22]'}`}>
                      {isIncoming ? '+' : ''}{tx.amount.toFixed(2)}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-16 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-[#112A22] mb-1">No transactions yet</h3>
              <p className="text-gray-500 text-sm max-w-sm mx-auto">
                Once you complete gigs or fund your wallet, your ledger will appear here.
              </p>
            </div>
          )}
        </div>
      </motion.div>

    </div>
  );
}