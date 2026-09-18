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
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={bubble}
              initial={{ opacity: 0, y: 8, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.94 }}
              className="mb-2 ml-16 rounded-2xl rounded-bl-sm bg-white px-3 py-1.5 text-[11px] font-bold text-slate-800 shadow-lg border border-orange-100 whitespace-nowrap"
            >
              {bubble}
            </motion.div>
          </AnimatePresence>

          <svg width="132" height="156" viewBox="0 0 132 156" fill="none">
            <ellipse cx="66" cy="148" rx="28" ry="6" fill="rgba(15,23,42,0.12)" />
            <path d="M38 96C38 88 92 88 96 100C98 112 90 128 66 132C42 128 34 110 38 96Z" fill="#ea580c" />
            <path d="M50 104C58 98 78 98 86 106" stroke="#fb923c" strokeWidth="3" strokeLinecap="round" />
            <rect x="28" y="92" width="16" height="28" rx="8" fill="#c2410c" />
            <rect x="88" y="92" width="16" height="28" rx="8" fill="#c2410c" />
            <circle cx="66" cy="62" r="32" fill="#ffe4c4" />
            <path d="M36 58C36 40 96 40 96 60C96 48 36 46 36 58Z" fill="#1e293b" />
            <rect x="58" y="24" width="16" height="12" rx="3" fill="#1e293b" />
            <path d="M30 58H102" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" />
            <circle cx="52" cy="64" r="8" fill="white" />
            <circle cx="80" cy="64" r="8" fill="white" />
            <motion.circle cx="52" cy="64" r="3.2" fill="#0f172a" style={{ x: pupilX, y: pupilY }} />
            <motion.circle cx="80" cy="64" r="3.2" fill="#0f172a" style={{ x: pupilX, y: pupilY }} />
            <path d="M58 78C62 82 70 82 74 78" stroke="#c2410c" strokeWidth="2.4" strokeLinecap="round" />
            <circle cx="40" cy="72" r="3" fill="#fb7185" opacity="0.55" />
            <circle cx="92" cy="72" r="3" fill="#fb7185" opacity="0.55" />
            <path d="M96 88C110 78 118 92 108 104" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
            <circle cx="110" cy="106" r="6" fill="#fbbf24" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CursorMascot;
