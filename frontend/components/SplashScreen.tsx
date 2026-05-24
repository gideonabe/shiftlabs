// 'use client';

// import React, { useEffect, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// interface SplashScreenProps {
//   onLoadComplete: () => void;
// }

// export const SplashScreen: React.FC<SplashScreenProps> = ({ onLoadComplete }) => {
//   const [isVisible, setIsVisible] = useState(true);

//   useEffect(() => {
//     // Reveal duration before shifting out
//     const timer = setTimeout(() => {
//       setIsVisible(false);
//       setTimeout(onLoadComplete, 800); // Wait for exit animation
//     }, 2200);

//     return () => clearTimeout(timer);
//   }, [onLoadComplete]);

//   return (
//     <AnimatePresence>
//       {isVisible && (
//         <motion.div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950 overflow-hidden"
//           exit={{ y: '-100%' }}
//           transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
//         >
//           <div className="relative flex flex-col items-center justify-center w-full">
            
//             {/* Top Half of the Shift */}
//             <motion.div 
//               className="overflow-hidden h-16 sm:h-24 flex items-end"
//               initial={{ x: -100, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
//             >
//               <h1 className="text-[5rem] sm:text-[8rem] font-black text-white leading-none tracking-tighter -skew-x-6 translate-y-1/2">
//                 SHI
//               </h1>
//             </motion.div>

//             {/* Middle Volt Line (The cut) */}
//             <motion.div
//               className="w-full h-1 bg-[#CCFF00] absolute top-1/2 -translate-y-1/2 z-10"
//               initial={{ scaleX: 0 }}
//               animate={{ scaleX: 1 }}
//               transition={{ duration: 0.8, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
//             />

//             {/* Bottom Half of the Shift */}
//             <motion.div 
//               className="overflow-hidden h-16 sm:h-24 flex items-start"
//               initial={{ x: 100, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
//             >
//               <h1 className="text-[5rem] sm:text-[8rem] font-black text-white leading-none tracking-tighter -skew-x-6 -translate-y-1/2">
//                 FT.
//               </h1>
//             </motion.div>

//             {/* Subtitle fading in */}
//             <motion.p
//               className="absolute bottom-[-60px] text-[#CCFF00] font-bold tracking-widest uppercase text-sm"
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 1.2 }}
//             >
//               Student Market
//             </motion.p>
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };










'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onLoadComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onLoadComplete }) => {
  const [phase, setPhase] = useState<'enter' | 'slice' | 'exit'>('enter');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('slice'), 1400); // Trigger the cut
    const t2 = setTimeout(() => setPhase('exit'), 2400);  // Slide apart
    const t3 = setTimeout(onLoadComplete, 3200);          // Unmount

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onLoadComplete]);

  // A 12-degree diagonal slice
  const clipTop = 'polygon(0 0, 100% 0, 100% 40%, 0 60%)';
  const clipBottom = 'polygon(0 60%, 100% 40%, 100% 100%, 0 100%)';

  // const clipTop = 'polygon(0 0, 100% 0, 100% 65%, 0 35%)';
  // const clipBottom = 'polygon(0 35%, 100% 65%, 100% 100%, 0 100%)';

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#112A22] overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Top Half */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ clipPath: clipTop }}
            initial={{ y: 0 }}
            animate={phase === 'slice' ? { x: -20, y: -10 } : { x: 0, y: 0 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <h1 className="text-[12vw] sm:text-[9rem] font-black tracking-tighter text-[#FAF9F6] -translate-y-12">
              SHIFT
            </h1>
          </motion.div>

          {/* The Laser Slice Line */}
          <motion.div
            className="absolute left-1/2 top-1/2 h-[2px] bg-[#D4AF37] z-10 w-[120vw] -translate-x-1/2 -translate-y-1/2 origin-center"
            style={{ rotate: '-11.5deg' }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={phase === 'slice' ? { scaleX: 1, opacity: 1 } : { opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'circOut' }}
          />

          {/* Bottom Half */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ clipPath: clipBottom }}
            initial={{ y: 0 }}
            animate={phase === 'slice' ? { x: 20, y: 10 } : { x: 0, y: 0 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <h1 className="text-[12vw] sm:text-[9rem] font-black tracking-tighter text-[#FAF9F6] translate-y-12">
              LABS.
            </h1>
            <motion.p 
              className="absolute bottom-16 text-[#FAF9F6]/60 font-medium tracking-widest uppercase text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 'slice' ? 1 : 0 }}
            >
              The New Standard
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};










// 'use client';

// import React, { useEffect, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// interface SplashScreenProps {
//   onLoadComplete: () => void;
// }

// export const SplashScreen: React.FC<SplashScreenProps> = ({ onLoadComplete }) => {
//   const [phase, setPhase] = useState<'enter' | 'slice' | 'exit'>('enter');

//   useEffect(() => {
//     const t1 = setTimeout(() => setPhase('slice'), 1400); 
//     const t2 = setTimeout(() => setPhase('exit'), 2400);  
//     const t3 = setTimeout(onLoadComplete, 3200);          

//     return () => {
//       clearTimeout(t1);
//       clearTimeout(t2);
//       clearTimeout(t3);
//     };
//   }, [onLoadComplete]);

//   const clipTop = 'polygon(0 0, 100% 0, 100% 45%, 0 55%)';
//   const clipBottom = 'polygon(0 55%, 100% 45%, 100% 100%, 0 100%)';

//   return (
//     <AnimatePresence>
//       {phase !== 'exit' && (
//         <motion.div
//           className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A2518] overflow-hidden"
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.8, ease: "easeInOut" }}
//         >
//           {/* Top Half */}
//           <motion.div
//             className="absolute inset-0 flex items-center justify-center"
//             style={{ clipPath: clipTop }}
//             initial={{ y: 0 }}
//             animate={phase === 'slice' ? { x: -20, y: -10 } : { x: 0, y: 0 }}
//             exit={{ y: '-100%', opacity: 0 }}
//             transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
//           >
//             <h1 className="text-[12vw] sm:text-[9rem] font-black tracking-tighter text-white">
//               SHIFT
//             </h1>
//           </motion.div>

//           {/* The Laser Slice Line (Now in a bright Emerald/Mint) */}
//           <motion.div
//             className="absolute left-1/2 top-1/2 h-[2px] bg-[#10B981] z-10 w-[120vw] -translate-x-1/2 -translate-y-1/2 origin-center shadow-[0_0_20px_#10B981]"
//             style={{ rotate: '-5.7deg' }}
//             initial={{ scaleX: 0, opacity: 0 }}
//             animate={phase === 'slice' ? { scaleX: 1, opacity: 1 } : { opacity: 0 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.6, ease: 'circOut' }}
//           />

//           {/* Bottom Half */}
//           <motion.div
//             className="absolute inset-0 flex items-center justify-center"
//             style={{ clipPath: clipBottom }}
//             initial={{ y: 0 }}
//             animate={phase === 'slice' ? { x: 20, y: 10 } : { x: 0, y: 0 }}
//             exit={{ y: '100%', opacity: 0 }}
//             transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
//           >
//             <h1 className="text-[12vw] sm:text-[9rem] font-black tracking-tighter text-white">
//               SHIFT
//             </h1>
//             <motion.p 
//               className="absolute bottom-16 text-emerald-400 font-medium tracking-widest uppercase text-xs"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: phase === 'slice' ? 1 : 0 }}
//             >
//               System Initializing
//             </motion.p>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };