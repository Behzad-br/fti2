import { motion } from 'framer-motion';
import { Check, Monitor, Cpu, User, Cloud, ArrowRight, Star } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import useScrollReveal from '@/hooks/useScrollReveal';
import { useState, useEffect } from 'react';
import Marquee from 'react-fast-marquee';
import AnimatedSection from '@/components/animations/AnimatedSection';
import { useCMS } from '@/context/CMSContext';


const features = [
  { icon: Monitor, text: 'Technology-based classrooms' },
  { icon: Cpu, text: 'All-in-one practice systems' },
  { icon: User, text: 'Pearson-certified training' },
  { icon: Cloud, text: 'Individual online portal access' },
];

const advantages = [
  'Computer-based test simulation',
  'AI-powered scoring for instant feedback',
  'Unlimited practice tests',
  'Individual progress tracking',
  'Flexible scheduling',
  'Fast score delivery (typically 2-5 days)',
];



import PromoBoard from '@/components/shared/PromoBoard';

const PTE = () => {
  const { ref, isVisible } = useScrollReveal(0.1);
  const { cmsData } = useCMS();


  return (
    <Layout>
      <div className="page-transition">
        {/* Hero */}
        <section className="bg-gradient-to-r from-orange-500 to-amber-500 py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center text-white"
            >
              <span className="inline-block bg-white/20 rounded-full px-4 py-1 text-sm font-medium mb-4">
                AI-Powered Training Labs
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {cmsData.pteHeroTitle}
              </h1>
              <p className="text-lg text-white/80 leading-relaxed mb-8">
                {cmsData.pteHeroDescription}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
                <Button
                  size="xl"
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white hover:text-orange-500 bg-transparent backdrop-blur-sm w-full sm:w-auto"
                  asChild
                >
                  <a href="https://fti.20task.com/auth/login" target="_blank" rel="noopener noreferrer">
                    Access Your Portal
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Live Promotions / Ad Board */}
        <section className="bg-gray-50 border-b border-gray-200">
          <PromoBoard category="PTE" />
        </section>

        {/* Features */}
        <section className="py-20 bg-white" ref={ref}>
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 relative"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: index * 0.3
                  }}
                  whileHover={{ scale: 1.05, y: -15, transition: { duration: 0.2 } }}
                  className="flex items-center gap-4 bg-orange-50 rounded-2xl p-5 md:p-6 shadow-[0_4px_20px_rgba(255,165,0,0.05)] hover:shadow-[0_20px_40px_rgba(255,165,0,0.15)] border border-orange-100/50 hover:border-orange-200 transition-colors group cursor-default relative overflow-hidden"
                >
                  <div className="absolute -right-4 -top-4 w-16 h-16 bg-orange-500/10 rounded-full blur-xl group-hover:bg-orange-500/20 transition-colors" />
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <feature.icon className="h-6 w-6 text-white drop-shadow-md" />
                  </div>
                  <span className="font-bold text-slate-800 leading-tight relative z-10 group-hover:text-primary transition-colors">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Why PTE */}
            <div className="grid md:grid-cols-2 gap-16 items-center mt-32">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="absolute -left-10 top-0 w-32 h-32 bg-orange-400/20 rounded-full blur-3xl pointer-events-none" />
                <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-8 relative z-10 tracking-tight">
                  Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">PTE?</span>
                </h2>
                <div className="space-y-4">
                  {advantages.map((adv, index) => (
                    <motion.div 
                      key={index} 
                      whileHover={{ x: 8, scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="flex items-center gap-4 bg-white border border-slate-100 p-4 rounded-2xl shadow-sm hover:shadow-md hover:border-orange-200 transition-all cursor-default relative overflow-hidden group"
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0 group-hover:bg-orange-100 transition-colors">
                        <Check className="h-5 w-5 text-orange-500" strokeWidth={3} />
                      </div>
                      <span className="text-slate-700 font-bold text-lg">{adv}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, type: "spring" }}
                className="relative perspective-1000"
              >
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] p-10 overflow-hidden relative shadow-2xl border border-slate-700">
                  <div className="absolute -right-20 -top-20 w-64 h-64 bg-orange-500/30 rounded-full blur-3xl" />
                  <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl" />
                  
                  <div className="relative z-10">
                    <div className="inline-flex items-center py-1.5 px-4 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 font-bold text-xs uppercase tracking-widest mb-6">
                      <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse mr-2" />
                      Experience It
                    </div>
                    <h3 className="text-3xl font-black text-white mb-4">Book a Lab Tour</h3>
                    <p className="text-slate-300 mb-8 text-lg leading-relaxed font-medium">
                      Don't just take our word for it. Visit our state-of-the-art PTE lab, test our AI systems, and experience our training facilities firsthand before you decide.
                    </p>
                    
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        size="xl"
                        className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-bold text-lg shadow-[0_0_20px_rgba(255,165,0,0.4)] border border-orange-400 h-16"
                        asChild
                      >
                        <Link to="/free-consultation" className="flex items-center justify-center">
                          Schedule Free Visit
                          <ArrowRight className="h-5 w-5 ml-3" />
                        </Link>
                      </Button>
                    </motion.div>
                  </div>
                </div>
                {/* Decorative floating elements */}
                <motion.div 
                  animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }} 
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 hidden md:flex items-center justify-center z-20"
                >
                  <Cpu className="w-8 h-8 text-orange-500" />
                </motion.div>
                <motion.div 
                  animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }} 
                  transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                  className="absolute -bottom-8 -left-8 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 hidden md:flex items-center justify-center z-20"
                >
                  <Monitor className="w-8 h-8 text-amber-500" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>


        {/* Success Stories / Testimonials */}
        <AnimatedSection className="py-32 overflow-hidden bg-[#f5f5f5] relative">
          
          <div className="container mx-auto px-4 mb-16 relative z-10">
            <div className="text-center">
              <span className="inline-block py-1.5 px-4 rounded-full bg-white border border-orange-100 text-primary font-bold text-xs uppercase tracking-widest mb-6 shadow-sm">Wall of Fame</span>
              <h2 className="text-4xl md:text-6xl font-black text-center tracking-tight text-slate-900 mb-4">Our Recent Successes</h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">Real students, real bands. Browse through our top achievers.</p>
            </div>
          </div>
          
          <div className="relative z-10 py-4">
            <div className="absolute left-0 top-0 h-full w-20 md:w-60 bg-gradient-to-r from-[#f5f5f5] to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 h-full w-20 md:w-60 bg-gradient-to-l from-[#f5f5f5] to-transparent z-20 pointer-events-none" />
            
            <Marquee gradient={false} speed={50} pauseOnHover={true} direction="left" className="py-8">
              {cmsData.pteSuccessImages.map((src, i) => (
                  <div key={i} className="mx-5 flex-shrink-0 group">
                      <motion.div 
                          whileHover={{ scale: 1.05 }}
                          className="w-72 md:w-80 h-96 md:h-[420px] rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white hover:border-orange-200 transition-all duration-500 bg-white relative cursor-grab active:cursor-grabbing"
                      >
                          <img
                              src={src}
                              alt={`PTE Achiever ${i + 1}`}
                              className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=400&fit=crop';
                              }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                              <p className="text-white font-bold text-sm uppercase tracking-[0.2em] mb-2 drop-shadow-md">FTI Achiever</p>
                              <div className="flex items-center gap-2">
                                <span className="text-white font-black text-2xl drop-shadow-lg">Verified Score</span>
                                <Star className="w-5 h-5 text-orange-400 fill-orange-400" />
                              </div>
                          </div>
                      </motion.div>
                  </div>
              ))}
            </Marquee>
          </div>
        </AnimatedSection>

      </div>
    </Layout>
  );
};

export default PTE;
