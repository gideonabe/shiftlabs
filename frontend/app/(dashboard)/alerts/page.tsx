'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  Wallet, 
  MessageSquare, 
  CheckCircle2, 
  ShieldCheck,
  MapPin,
  Check
} from 'lucide-react';

// Mock Data
const INITIAL_ALERTS = [
  {
    id: 1,
    type: 'payment',
    title: 'Payment Released',
    message: '$45.00 has cleared escrow for "Move boxes to North Hall".',
    time: '2 mins ago',
    unread: true,
    icon: Wallet,
    color: 'bg-emerald-50 text-[#10B981]'
  },
  {
    id: 2,
    type: 'message',
    title: 'New Message from Diego',
    message: 'Hey, I just arrived at the library. Where are you sitting?',
    time: '1 hour ago',
    unread: true,
    icon: MessageSquare,
    color: 'bg-blue-50 text-blue-600'
  },
  {
    id: 3,
    type: 'system',
    title: 'Account Verified',
    message: 'Your .edu email has been confirmed. You can now post and accept gigs.',
    time: 'Yesterday',
    unread: false,
    icon: ShieldCheck,
    color: 'bg-[#112A22] text-white'
  },
  {
    id: 4,
    type: 'gig',
    title: 'Application Accepted',
    message: 'Sarah J. accepted your offer for "Event Setup Assistant".',
    time: '2 days ago',
    unread: false,
    icon: CheckCircle2,
    color: 'bg-gray-100 text-[#112A22]'
  },
  {
    id: 5,
    type: 'nearby',
    title: 'High Demand Nearby',
    message: '5 new urgent gigs were just posted within 0.5 miles of you.',
    time: '3 days ago',
    unread: false,
    icon: MapPin,
    color: 'bg-orange-50 text-orange-600'
  }
];

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Unread', 'Payments'];

  const filteredAlerts = alerts.filter(alert => {
    if (activeFilter === 'Unread') return alert.unread;
    if (activeFilter === 'Payments') return alert.type === 'payment';
    return true;
  });

  const markAllAsRead = () => {
    setAlerts(alerts.map(a => ({ ...a, unread: false })));
  };

  const markAsRead = (id: number) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, unread: false } : a));
  };

  return (
    <div className="max-w-[1000px] mx-auto px-6 sm:px-10 py-10 pb-32 md:pb-12">
      
      {/* ==================== HEADER ==================== */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-[#112A22] flex items-center gap-4">
            Alerts
            {alerts.filter(a => a.unread).length > 0 && (
              <span className="bg-red-500 text-white text-lg font-bold px-3 py-1 rounded-full">
                {alerts.filter(a => a.unread).length}
              </span>
            )}
          </h1>
        </div>
        
        <button 
          onClick={markAllAsRead}
          className="text-sm font-bold text-gray-400 hover:text-[#112A22] flex items-center gap-2 transition-colors"
        >
          <Check size={16} /> Mark all as read
        </button>
      </div>

      {/* ==================== FILTERS ==================== */}
      <div className="flex gap-2 mb-8 border-b border-gray-200/60 pb-4">
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
              activeFilter === filter 
              ? 'bg-[#112A22] text-white' 
              : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* ==================== ALERTS LIST ==================== */}
      <div className="bg-white border border-gray-200/60 rounded-[2rem] overflow-hidden shadow-sm">
        {filteredAlerts.length === 0 ? (
          <div className="p-16 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-[#112A22] mb-1">You're all caught up</h3>
            <p className="text-gray-500 text-sm">No new alerts to show right now.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            <AnimatePresence>
              {filteredAlerts.map((alert) => {
                const Icon = alert.icon;
                return (
                  <motion.div 
                    key={alert.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    onClick={() => markAsRead(alert.id)}
                    className={`p-6 flex gap-5 hover:bg-gray-50 transition-colors cursor-pointer relative group ${
                      alert.unread ? 'bg-emerald-50/10' : ''
                    }`}
                  >
                    {/* Unread Indicator Bar */}
                    {alert.unread && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#10B981]" />
                    )}

                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-sm ${alert.color}`}>
                      <Icon size={20} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                        <h4 className={`text-base truncate pr-4 ${alert.unread ? 'font-black text-[#112A22]' : 'font-bold text-gray-700'}`}>
                          {alert.title}
                        </h4>
                        <span className="text-xs font-medium text-gray-400 shrink-0">
                          {alert.time}
                        </span>
                      </div>
                      <p className={`text-sm leading-relaxed ${alert.unread ? 'text-gray-700 font-medium' : 'text-gray-500'}`}>
                        {alert.message}
                      </p>
                    </div>

                    {/* Unread Dot */}
                    {alert.unread && (
                      <div className="w-2.5 h-2.5 bg-[#10B981] rounded-full mt-2 shrink-0 shadow-sm shadow-emerald-500/50" />
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

    </div>
  );
}