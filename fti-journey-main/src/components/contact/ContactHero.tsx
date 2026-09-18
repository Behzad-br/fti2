import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Globe2, Plane, Sparkles } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const countries = [
  { flag: '🇬🇧', label: 'UK', top: '18%', left: '8%' },
  { flag: '🇨🇦', label: 'CA', top: '22%', left: '78%' },
  { flag: '🇦🇺', label: 'AU', top: '68%', left: '10%' },
  { flag: '🇮🇪', label: 'IE', top: '62%', left: '82%' },
  { flag: '🇺🇸', label: 'US', top: '8%', left: '46%' },
];

const floatIcons = [
  { Icon: GraduationCap, className: 'top-[16%] left-[16%]', delay: 0 },
  { Icon: BookOpen, className: 'top-[20%] right-[14%]', delay: 0.4 },
  { Icon: Globe2, className: 'bottom-[18%] left-[20%]', delay: 0.8 },
  { Icon: Sparkles, className: 'bottom-[16%] right-[18%]', delay: 1.2 },
];

const ContactHero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#7c2d12] via-[#c2410c] to-[#ea580c] pt-20 pb-16 md:pt-28 md:pb-20">
      <motion.div
        className="pointer-events-none absolute -top-24 -left-16 h-[420px] w-[420px] rounded-full bg-black/20 blur-[110px]"
        animate={{ x: [0, 40, 0], y: [0, 24, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute top-10 right-0 h-[380px] w-[380px] rounded-full bg-amber-300/25 blur-[100px]"
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-50" viewBox="0 0 1200 360" fill="none" preserveAspectRatio="none">
        <motion.path
          d="M80 240 C 280 40, 520 320, 760 120 S 1080 80, 1140 200"
          stroke="#fed7aa"
          strokeWidth="2"
          strokeDasharray="8 10"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{ duration: 2.2, ease: 'easeInOut' }}
        />
      </svg>

      <motion.div
        className="pointer-events-none absolute left-[6%] top-[42%] hidden md:block"
        animate={{ x: [0, 720, 0], y: [0, -90, 40, 0], rotate: [0, 18, -8, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-xl border border-orange-100">
          <Plane className="h-6 w-6 text-orange-500" />
        </div>
      </motion.div>

      {floatIcons.map(({ Icon, className, delay }) => (
        <motion.div
          key={className}
          className={`pointer-events-none absolute hidden rounded-2xl border border-orange-100 bg-white/80 p-3 shadow-lg backdrop-blur-md md:block ${className}`}
          animate={{ y: [0, -14, 0], rotate: [-8, 8, -8] }}
          transition={{ duration: 5.5, repeat: Infinity, delay, ease: 'easeInOut' }}
        >
          <Icon className="h-6 w-6 text-orange-500" />
        </motion.div>
      ))}

      {countries.map((c, i) => (
        <motion.div
          key={c.label}
          className="pointer-events-none absolute hidden items-center gap-1.5 rounded-full border border-white bg-white/90 px-3 py-1.5 text-xs font-black text-slate-700 shadow-md backdrop-blur md:flex"
          style={{ top: c.top, left: c.left }}
          animate={{ y: [0, -10, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 3.6 + i * 0.35, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
        >
          <span>{c.flag}</span>
          <span>{c.label}</span>
        </motion.div>
      ))}

      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="mx-auto max-w-4xl">
          <motion.h1 variants={fadeInUp} className="relative mb-2 text-5xl font-black tracking-tight text-white md:text-7xl">
            {'Contact'.split('').map((ch, i) => (
              <motion.span
                key={`c-${i}`}
                className="inline-block"
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 + i * 0.04, type: 'spring', stiffness: 280, damping: 18 }}
              >
                {ch}
              </motion.span>
            ))}
            <span className="inline-block w-3" />
            {'Us'.split('').map((ch, i) => (
              <motion.span
                key={`u-${i}`}
                className="inline-block bg-gradient-to-r from-amber-200 to-yellow-300 bg-clip-text text-transparent"
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.48 + i * 0.06, type: 'spring', stiffness: 280, damping: 18 }}
              >
                {ch}
              </motion.span>
            ))}
          </motion.h1>

          <motion.div
            className="mx-auto mt-3 h-1.5 w-28 overflow-hidden rounded-full bg-white/25"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 112, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <motion.div
              className="h-full w-1/2 rounded-full bg-gradient-to-r from-amber-200 to-yellow-300"
              animate={{ x: ['-20%', '140%', '-20%'] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactHero;
