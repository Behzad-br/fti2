import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const CTASection = () => {
  const handleWhatsApp = () => {
    window.dispatchEvent(new CustomEvent('open-whatsapp-selector'));
  };

  return (
    <section className="py-8 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative rounded-[2rem] overflow-hidden shadow-2xl"
        >
          {/* Dark gradient background — pure black, no blue */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #111111 100%)' }} />

          {/* Animated orange glow orbs */}
          <motion.div
            animate={{ x: [0, 20, 0], y: [0, -20, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[-60px] left-[-60px] w-72 h-72 bg-orange-500/20 rounded-full blur-[80px] pointer-events-none"
          />
          <motion.div
            animate={{ x: [0, -20, 0], y: [0, 20, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute bottom-[-60px] right-[-60px] w-96 h-96 bg-orange-400/15 rounded-full blur-[100px] pointer-events-none"
          />

          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />

          {/* Content */}
          <div className="relative z-10 px-8 py-10 md:px-14 md:py-12 flex flex-col items-center text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 text-orange-400 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-5"
            >
              <Sparkles className="w-3 h-3" />
              Free Counselling Available
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl md:text-5xl font-black text-white mb-3 tracking-tight leading-tight"
            >
              Start Your Journey{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400 italic">
                Today
              </span>
            </motion.h2>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-white/60 text-sm md:text-base max-w-lg mx-auto mb-7 leading-relaxed"
            >
              Our expert counsellors are ready to guide you — from university selection to visa approval.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col items-center"
            >
              <Link to="/contact">
                <Button className="h-14 md:h-16 px-8 md:px-12 rounded-full bg-gradient-to-r from-[#f38d31] to-[#ff9d45] hover:from-[#e27d21] hover:to-[#f38d31] text-white text-lg md:text-xl font-bold shadow-[0_10px_20px_-10px_rgba(243,141,49,0.5)] border-none transition-all duration-300 hover:scale-105 group">
                  Book Your Free Counselling Now
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>

            {/* Trust strip */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-white/30 text-[10px] font-semibold tracking-[0.2em] uppercase"
            >
              Free Assessment • Trusted by 11000+ Students • 98% Success Rate
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
