import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

export type MascotMood = 'idle' | 'typing' | 'sending' | 'success';

const IDLE_LINES = ['Hey! Need a hand?', 'Study abroad with us', 'Ask me anything!'];

interface CursorMascotProps {
  mood?: MascotMood;
}

const CursorMascot = ({ mood = 'idle' }: CursorMascotProps) => {
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const [ready, setReady] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [line, setLine] = useState(0);

  const spring = { stiffness: 70, damping: 16, mass: 0.9 };
  const lagSpring = { stiffness: 36, damping: 14, mass: 1.1 };
  const x = useSpring(mouseX, spring);
  const y = useSpring(mouseY, spring);
  const planeX = useSpring(mouseX, lagSpring);
  const planeY = useSpring(mouseY, lagSpring);

  const pupilX = useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1200], [-5, 5]);
  const pupilY = useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 800], [-4, 4]);

  useEffect(() => {
    const fine = window.matchMedia('(any-pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;
    setEnabled(true);

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      mouseX.set(e.clientX + 56);
      mouseY.set(e.clientY + 28);
      setReady(true);
    };

    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    if (mood !== 'idle') return;
    const id = window.setInterval(() => setLine((n) => (n + 1) % IDLE_LINES.length), 3200);
    return () => window.clearInterval(id);
  }, [mood]);

  if (!enabled || !ready) return null;

  const bubble =
    mood === 'typing' ? 'Type away…' :
    mood === 'sending' ? 'Sending…' :
    mood === 'success' ? 'Message sent!' :
    IDLE_LINES[line];

  return (
    <div className="pointer-events-none fixed inset-0 z-40 hidden lg:block" aria-hidden>
      <motion.div
        className="absolute top-0 left-0"
        style={{ x: planeX, y: planeY }}
      >
        <motion.div
          className="-translate-x-[140px] -translate-y-[90px]"
          animate={{ y: [0, -10, 0], rotate: [-8, 10, -8] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
            <path d="M6 24L40 8L28 40L22 26L6 24Z" fill="#f97316" />
            <path d="M22 26L40 8L18 22.5L22 26Z" fill="#fed7aa" />
          </svg>
        </motion.div>
      </motion.div>

      <motion.div className="absolute top-0 left-0" style={{ x, y }}>
        <motion.div
          className="-translate-x-6 -translate-y-2"
          animate={{ y: [0, -12, 0], rotate: [-2, 2, -2] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={bubble}
              initial={{ opacity: 0, y: 8, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.94 }}
              className="mb-2 ml-16 rounded-2xl rounded-bl-sm bg-white px-4 py-2 text-[12px] font-bold text-indigo-900 shadow-xl border border-indigo-100 whitespace-nowrap"
            >
              {bubble}
            </motion.div>
          </AnimatePresence>

          <svg width="150" height="170" viewBox="0 0 150 170" fill="none">
            {/* Shadow */}
            <motion.ellipse 
              cx="75" cy="160" rx="35" ry="6" fill="rgba(15,23,42,0.12)" 
              animate={{ rx: [35, 28, 35], opacity: [0.12, 0.2, 0.12] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            
            {/* Body (Shirt with Tie) */}
            <path d="M45 106C45 94 105 94 105 106C108 120 98 140 75 144C52 140 42 120 45 106Z" fill="#e0e7ff" stroke="#3730a3" strokeWidth="4" />
            <path d="M75 106L68 124L75 138L82 124L75 106Z" fill="#dc2626" /> {/* Tie */}
            <path d="M55 106L75 116L95 106" fill="none" stroke="#3730a3" strokeWidth="3" strokeLinecap="round" /> {/* Collar */}

            {/* Arms holding a book */}
            <rect x="32" y="102" width="20" height="32" rx="10" fill="#c7d2fe" transform="rotate(15 42 118)" />
            <rect x="98" y="102" width="20" height="32" rx="10" fill="#c7d2fe" transform="rotate(-15 108 118)" />

            {/* Book */}
            <path d="M35 125Q75 135 115 125L110 145Q75 155 40 145Z" fill="#facc15" stroke="#a16207" strokeWidth="3" strokeLinejoin="round" />
            <path d="M75 130V150" stroke="#a16207" strokeWidth="3" strokeLinecap="round" />
            <path d="M45 132Q75 140 70 140" stroke="#a16207" strokeWidth="2" strokeLinecap="round" />
            <path d="M105 132Q75 140 80 140" stroke="#a16207" strokeWidth="2" strokeLinecap="round" />

            {/* Head */}
            <circle cx="75" cy="72" r="34" fill="#ffe4c4" />
            
            {/* Graduation Cap */}
            <path d="M30 45L75 25L120 45L75 65Z" fill="#1e293b" />
            <path d="M55 55V75C55 80 95 80 95 75V55" fill="#1e293b" />
            <circle cx="75" cy="45" r="4" fill="#fbbf24" />
            {/* Tassel */}
            <motion.path d="M75 45Q105 45 115 65" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" fill="none"
              animate={{ d: ["M75 45Q105 45 115 65", "M75 45Q110 55 112 70", "M75 45Q105 45 115 65"] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            
            {/* Big Round Nerd Glasses */}
            <circle cx="58" cy="72" r="14" fill="white" stroke="#0f172a" strokeWidth="4" />
            <circle cx="92" cy="72" r="14" fill="white" stroke="#0f172a" strokeWidth="4" />
            <path d="M72 72H78" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
            <path d="M44 72H35" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
            <path d="M106 72H115" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />

            {/* Pupils */}
            <motion.circle cx="58" cy="72" r="5" fill="#0f172a" style={{ x: pupilX, y: pupilY }} />
            <motion.circle cx="92" cy="72" r="5" fill="#0f172a" style={{ x: pupilX, y: pupilY }} />
            
            {/* Cheeks & Smile */}
            <circle cx="45" cy="85" r="4" fill="#fb7185" opacity="0.6" />
            <circle cx="105" cy="85" r="4" fill="#fb7185" opacity="0.6" />
            <path d="M68 88C72 92 78 92 82 88" stroke="#c2410c" strokeWidth="2.5" strokeLinecap="round" />

            {/* Floating Math/Idea Symbols */}
            <motion.g animate={{ y: [0, -10, 0], opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}>
              <text x="20" y="30" fontSize="16" fill="#fbbf24" fontWeight="bold">E=mc²</text>
            </motion.g>
            <motion.g animate={{ y: [0, -15, 0], opacity: [0, 1, 0] }} transition={{ duration: 2.5, repeat: Infinity, delay: 1.5 }}>
              <text x="120" y="20" fontSize="20" fill="#38bdf8" fontWeight="bold">💡</text>
            </motion.g>
            <motion.g animate={{ y: [0, -8, 0], opacity: [0, 1, 0] }} transition={{ duration: 1.8, repeat: Infinity, delay: 0.8 }}>
              <text x="125" y="80" fontSize="18" fill="#a78bfa" fontWeight="bold">∑</text>
            </motion.g>
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CursorMascot;
