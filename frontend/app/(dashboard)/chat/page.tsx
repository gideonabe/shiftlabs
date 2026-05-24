'use client'

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, MoreVertical, Phone, Video, Send, 
  Paperclip, Mic, Smile, ArrowLeft, Check, CheckCheck, MapPin, Zap
} from 'lucide-react';

// Enhanced Mock Data
const conversations = [
  { 
    id: '1', 
    name: 'Olivia Mitch', 
    role: 'Student • Junior',
    lastMsg: 'yes pls 🙏 you free in 20?', 
    time: '2:14 PM', 
    unread: 2,
    online: true,
    gigContext: { title: 'Move delivery boxes to North Hall', budget: 35 },
    messages: [
      { id: 'm1', text: 'hey! still need a hand with the couch?', sender: 'me', time: '2:12 PM', status: 'read' },
      { id: 'm2', text: 'yep, headed to my truck rn', sender: 'me', time: '2:13 PM', status: 'read' },
      { id: 'm3', text: 'yes pls 🙏 you free in 20?', sender: 'them', time: '2:14 PM', status: 'sent' },
    ]
  },
  { 
    id: '2', 
    name: 'Diego Ramos', 
    role: 'Local Business',
    lastMsg: 'logs uploaded — check the screenshot', 
    time: '12m', 
    unread: 0,
    online: false,
    gigContext: null,
    messages: [
      { id: 'm1', text: 'logs uploaded — check the screenshot', sender: 'them', time: '1:45 PM', status: 'read' }
    ]
  },
  { 
    id: '3', 
    name: 'Aisha Bello', 
    role: 'Student • Senior',
    lastMsg: 'Voice note (0:14)', 
    time: '1h', 
    unread: 1,
    online: true,
    gigContext: { title: 'Calculus II Tutoring', budget: 45 },
    messages: [
      { id: 'm1', text: 'Voice note (0:14)', sender: 'them', time: '11:30 AM', status: 'read' }
    ]
  },
];

export default function ChatPage() {
  const [activeChat, setActiveChat] = useState(conversations[0]);
  const [message, setMessage] = useState('');
  const [showMobileChat, setShowMobileChat] = useState(false); // Handles mobile view switching
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat, message]);

  return (
    // Height is calculated to fit perfectly under your TopHeader (assuming h-20/5rem header)
    <div className="flex h-[calc(100vh-5rem)] bg-white overflow-hidden w-full relative border-t border-gray-100">
      
      {/* ==================== LEFT: CONVERSATION LIST ==================== */}
      <aside className={`w-full md:w-[320px] lg:w-[380px] border-r border-gray-100 flex-col bg-white z-10 ${showMobileChat ? 'hidden md:flex' : 'flex'}`}>
        
        {/* Inbox Header */}
        <div className="p-6 pb-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-black text-[#112A22] tracking-tight">Messages</h2>
            <button className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-[#112A22] hover:bg-gray-100 transition-colors">
              <MoreVertical size={16} />
            </button>
          </div>
          <div className="relative group">
            <Search className="absolute left-3.5 top-2.5 text-gray-400 group-focus-within:text-[#10B981] transition-colors" size={16} />
            <input 
              placeholder="Search chats..." 
              className="w-full bg-gray-50/50 border border-gray-200/80 rounded-full py-2.5 pl-10 pr-4 text-sm font-medium outline-none focus:bg-white focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/10 transition-all"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {conversations.map((conv) => {
            const isActive = activeChat.id === conv.id;
            return (
              <button
                key={conv.id}
                onClick={() => {
                  setActiveChat(conv);
                  setShowMobileChat(true); // Slide in chat on mobile
                }}
                className={`w-full p-4 flex items-center gap-4 border-b border-gray-50 transition-all ${
                  isActive ? 'bg-[#FAF9F6] relative' : 'hover:bg-gray-50'
                }`}
              >
                {/* Active Indicator Line */}
                {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#10B981]" />}

                <div className="relative">
                  <div className="w-12 h-12 bg-gray-100 rounded-full font-bold flex items-center justify-center shrink-0 text-[#112A22] border border-gray-200">
                    {conv.name.charAt(0)}
                  </div>
                  {conv.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#10B981] border-2 border-white rounded-full" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-bold text-sm text-[#112A22] truncate pr-2">{conv.name}</p>
                    <span className={`text-[10px] whitespace-nowrap font-medium ${conv.unread > 0 ? 'text-[#10B981]' : 'text-gray-400'}`}>
                      {conv.time}
                    </span>
                  </div>
                  <p className={`text-xs truncate ${conv.unread > 0 ? 'font-bold text-[#112A22]' : 'font-medium text-gray-500'}`}>
                    {conv.lastMsg}
                  </p>
                </div>
                
                {conv.unread > 0 && (
                  <div className="w-5 h-5 bg-[#10B981] rounded-full text-[10px] text-white flex items-center justify-center font-bold shadow-sm shadow-emerald-500/20">
                    {conv.unread}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </aside>

      {/* ==================== RIGHT: ACTIVE CHAT ==================== */}
      <section className={`flex-1 flex-col bg-[#FAF9F6] relative ${!showMobileChat ? 'hidden md:flex' : 'flex absolute inset-0 z-20 md:static'}`}>
        
        {/* Chat Header */}
        <div className="h-20 border-b border-gray-200/60 bg-white/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowMobileChat(false)} 
              className="md:hidden w-8 h-8 flex items-center justify-center -ml-2 text-gray-500 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft size={20} />
            </button>
            
            <div className="relative">
              <div className="w-10 h-10 bg-[#112A22] rounded-full text-white font-bold flex items-center justify-center shadow-sm">
                {activeChat.name.charAt(0)}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-[#112A22] leading-tight">{activeChat.name}</h3>
              <p className="text-[11px] text-gray-500 font-medium">{activeChat.role}</p>
            </div>
          </div>
          
          <div className="flex gap-2 text-gray-400">
            <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 hover:text-[#112A22] transition-colors"><Phone size={18} /></button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 hover:text-[#112A22] transition-colors"><Video size={18} /></button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 hover:text-[#112A22] transition-colors"><MoreVertical size={18} /></button>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
          
          {/* Contextual Gig Reference Card */}
          {activeChat.gigContext && (
            <div className="flex justify-center mb-8">
              <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm max-w-sm w-full flex items-center justify-between group cursor-pointer hover:border-[#10B981]/40 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                    <Zap size={18} className="text-[#10B981] fill-[#10B981]/20" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Regarding Gig</p>
                    <p className="text-sm font-bold text-[#112A22] truncate max-w-[180px]">{activeChat.gigContext.title}</p>
                  </div>
                </div>
                <div className="text-lg font-black text-[#10B981]">${activeChat.gigContext.budget}</div>
              </div>
            </div>
          )}

          <div className="text-center text-[10px] text-gray-400 uppercase tracking-widest font-bold my-6">Today</div>
          
          <AnimatePresence>
            {activeChat.messages.map((msg) => {
              const isOwn = msg.sender === 'me';
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}
                >
                  <div className={`max-w-[75%] md:max-w-md px-4 py-2.5 text-[15px] shadow-sm relative ${
                    isOwn 
                    ? 'bg-[#112A22] text-white rounded-2xl rounded-tr-sm' 
                    : 'bg-white border border-gray-200/60 text-[#112A22] rounded-2xl rounded-tl-sm'
                  }`}>
                    {msg.text}
                  </div>
                  
                  {/* Metadata (Time & Read Receipt) */}
                  <div className="flex items-center gap-1 mt-1 px-1">
                    <span className="text-[10px] font-medium text-gray-400">{msg.time}</span>
                    {isOwn && (
                      msg.status === 'read' 
                        ? <CheckCheck size={12} className="text-[#10B981]" /> 
                        : <Check size={12} className="text-gray-300" />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          <div ref={bottomRef} />
        </div>

        {/* Input Footer */}
        <div className="p-4 sm:p-6 bg-white border-t border-gray-100 z-10">
          <div className="flex items-center gap-2 sm:gap-3">
            <button className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center bg-gray-50 text-gray-400 hover:text-[#112A22] hover:bg-gray-100 transition-colors">
              <Paperclip size={18} />
            </button>
            
            <div className="flex-1 bg-gray-50 border border-gray-200/80 rounded-2xl flex items-center px-4 py-1 focus-within:border-[#10B981] focus-within:ring-2 focus-within:ring-[#10B981]/10 transition-all">
              <input 
                className="flex-1 bg-transparent py-2.5 text-[15px] outline-none font-medium placeholder:text-gray-400" 
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && message.trim()) {
                    setMessage('');
                    // Logic to add message to array goes here
                  }
                }}
              />
              <button className="p-2 text-gray-400 hover:text-[#112A22] transition-colors"><Smile size={20} /></button>
            </div>
            
            {message.trim() ? (
              <button className="w-12 h-12 shrink-0 bg-[#10B981] text-[#112A22] rounded-full flex items-center justify-center hover:bg-emerald-400 transition-colors shadow-md shadow-emerald-500/20 active:scale-95">
                <Send size={18} className="ml-0.5" />
              </button>
            ) : (
              <button className="w-12 h-12 shrink-0 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                <Mic size={18} />
              </button>
            )}
          </div>
        </div>

      </section>
    </div>
  );
}








// 'use client'

// import React, { useState, useEffect, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useAuthStore } from '@/store/authStore';
// import { apiClient } from '@/app/api/client';
// import { Send, ArrowLeft, MoreVertical, Phone, Video, Search } from 'lucide-react';

// export default function ChatPage({ params }: { params: { conversationId: string } }) {
//   const { conversationId } = params;
//   const { user } = useAuthStore();
//   const [messages, setMessages] = useState<any[]>([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(true);
//   const bottomRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     fetchMessages();
//     // Scroll to bottom on new message
//     bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const fetchMessages = async () => {
//     try {
//       const response = await apiClient.getMessages(conversationId);
//       setMessages(response.data);
//     } catch (err) {
//       console.error('Failed to fetch:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSendMessage = async () => {
//     if (!newMessage.trim()) return;
    
//     // Optimistic Update
//     const tempMsg = { 
//       id: Date.now(), 
//       content: newMessage, 
//       sender_id: user?.id, 
//       created_at: new Date().toISOString() 
//     };
//     setMessages([...messages, tempMsg]);
//     setNewMessage('');

//     try {
//       await apiClient.sendMessage(conversationId, newMessage);
//     } catch (err) {
//       console.error('Failed to send');
//     }
//   };

//   return (
//     <div className="flex flex-col h-full bg-[#FAF9F6]">
      
//       {/* Chat Header: Modern, thin, and clean */}
//       <div className="h-20 border-b border-gray-200/60 bg-white/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-10">
//         <div className="flex items-center gap-4">
//           <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-[#112A22]">
//             JD
//           </div>
//           <div>
//             <h2 className="font-bold text-[#112A22]">Jane Doe</h2>
//             <p className="text-xs text-[#10B981] font-medium flex items-center gap-1">
//               <span className="w-2 h-2 rounded-full bg-[#10B981]" /> Online
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center gap-4 text-gray-400">
//           <Phone size={18} className="hover:text-[#112A22] cursor-pointer" />
//           <Video size={18} className="hover:text-[#112A22] cursor-pointer" />
//           <MoreVertical size={18} className="hover:text-[#112A22] cursor-pointer" />
//         </div>
//       </div>

//       {/* Message Area */}
//       <div className="flex-1 overflow-y-auto p-6 space-y-6">
//         {messages.map((msg) => {
//           const isOwn = msg.sender_id === user?.id;
//           return (
//             <motion.div
//               key={msg.id}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
//             >
//               <div className={`max-w-[70%] px-5 py-3.5 rounded-3xl text-sm font-medium ${
//                 isOwn 
//                 ? 'bg-[#112A22] text-white rounded-br-none' 
//                 : 'bg-white text-[#112A22] rounded-bl-none shadow-sm border border-gray-100'
//               }`}>
//                 {msg.content}
//                 <div className={`text-[10px] mt-1.5 opacity-60 ${isOwn ? 'text-right' : ''}`}>
//                   {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                 </div>
//               </div>
//             </motion.div>
//           );
//         })}
//         <div ref={bottomRef} />
//       </div>

//       {/* Message Input: Floating Bottom Bar */}
//       <div className="p-4 bg-[#FAF9F6]">
//         <div className="max-w-3xl mx-auto relative flex items-center bg-white border border-gray-200 rounded-full shadow-lg shadow-black/5 p-1.5">
//           <input
//             className="flex-1 bg-transparent px-5 py-3 text-sm outline-none"
//             placeholder="Type your message..."
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
//           />
//           <button 
//             onClick={handleSendMessage}
//             className="bg-[#112A22] text-white p-3 rounded-full hover:bg-[#1c4236] transition-colors"
//           >
//             <Send size={16} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }