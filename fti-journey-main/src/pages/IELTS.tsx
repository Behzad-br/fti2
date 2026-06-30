import { motion } from 'framer-motion';
import {
  Check, Users, Clock, Award, BookOpen, Mic, PenTool,
  Headphones, ArrowRight, Star, Target, GraduationCap,
  Trophy, Zap, Sparkles, ChevronRight, Globe, Phone, MessageCircle
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCMS } from '@/context/CMSContext';

import Marquee from 'react-fast-marquee';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import PromoBoard from '@/components/shared/PromoBoard';
import FacultyGrid from '@/components/common/FacultyGrid';
import IELTSHero from '@/components/ielts/IELTSHero';
import PartnershipSection from '@/components/ielts/PartnershipSection';
import AcademicDirectorSection from '@/components/ielts/AcademicDirectorSection';
import { ParticlesBackground } from '@/components/shared/ParticlesBackground';
import AnimatedSection from '@/components/animations/AnimatedSection';
import StaggerContainer from '@/components/animations/StaggerContainer';




const IELTS = () => {
  const { cmsData } = useCMS();


  // Staggered generic variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <Layout>
      <div className="page-transition min-h-screen bg-orange-50/10 font-sans relative overflow-x-hidden">
        <ParticlesBackground />
        
        {/* Ayar-style Background Glows */}
        <div className="absolute top-[10%] -left-[10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-[40%] -right-[10%] w-[600px] h-[600px] bg-orange-400/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[20%] -left-[10%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

        <IELTSHero />

        <div className="relative z-10">
          <PartnershipSection />
          <AcademicDirectorSection />
        </div>

        {/* About IELTS Section */}
        <AnimatedSection className="py-24 bg-white/40 backdrop-blur-sm relative overflow-hidden">
          {/* Subtle Background Elements */}
          <div className="absolute top-0 left-0 w-1/2 h-full bg-orange-50/50 -skew-x-12 transform -translate-x-1/4 z-0" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.span 
                  className="inline-block py-1.5 px-4 rounded-full bg-orange-100 text-primary font-bold text-xs uppercase tracking-widest mb-6 shadow-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  About IELTS
                </motion.span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tight">
                  What is the <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">IELTS Exam?</span>
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-8 font-medium">
                  IELTS (International English Language Testing System) is one of the most widely accepted English language tests for study, work, and immigration. Universities and immigration authorities around the world require IELTS scores to assess English proficiency.
                </p>
                <div className="h-[1px] w-full bg-gradient-to-r from-orange-100 to-transparent mb-8" />
                <p className="text-lg text-slate-600 leading-relaxed mb-8 font-medium">
                  Our IELTS preparation program helps students improve their skills in all four key areas:
                </p>
                
                <StaggerContainer className="grid grid-cols-2 gap-4 mb-8">
                  {['Listening', 'Reading', 'Writing', 'Speaking'].map((skill) => (
                    <motion.div 
                      key={skill} 
                      className="flex items-center gap-4 bg-white hover:bg-orange-50 p-4 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(255,165,0,0.1)] transition-all duration-300 group cursor-default"
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center group-hover:bg-primary transition-colors duration-300 transform group-hover:scale-110">
                        <Check className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                      </div>
                      <span className="font-bold text-slate-800">{skill}</span>
                    </motion.div>
                  ))}
                </StaggerContainer>
              </motion.div>

              {/* Advanced Floating Partner Section */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-[600px] hidden lg:flex items-center justify-center"
              >
                {/* Parallax Floating Background Elements */}
                <motion.div 
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-0 right-0 w-96 h-96 bg-orange-400/10 rounded-full blur-[100px]" 
                />
                <motion.div 
                  animate={{ 
                    y: [0, -30, 0],
                    x: [0, 20, 0]
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-[80px]" 
                />

                {/* The Floating Main Card */}
                <motion.div
                  animate={{ 
                    y: [-15, 15, -15],
                    rotateX: [0, 2, 0],
                    rotateY: [0, -2, 0]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 w-full max-w-lg aspect-[4/5] perspective-1000"
                >
                  {/* Decorative Floating Achievement Badges */}
                  <motion.div
                    animate={{ y: [0, -20, 0], x: [0, 10, 0], rotate: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-12 -left-16 z-30 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-white/50 flex items-center gap-3"
                  >
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-black">7.5</div>
                    <span className="text-[10px] font-black uppercase tracking-tighter text-slate-500">Avg. Band Score</span>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 20, 0], x: [0, -10, 0], rotate: [0, -5, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/3 -right-20 z-30 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-white/50 flex items-center gap-3"
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-black">98%</div>
                    <span className="text-[10px] font-black uppercase tracking-tighter text-slate-500">Visa Success</span>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, -15, 0], x: [0, -15, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-10 -left-10 z-30 bg-primary/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-white/50 flex items-center gap-3 text-white"
                  >
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"><BookOpen className="w-5 h-5" /></div>
                    <span className="text-[10px] font-black uppercase tracking-tighter">Mock Tests</span>
                  </motion.div>

                  <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl rounded-[4rem] border border-white/60 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-primary/5" />
                    
                    <div className="relative h-full p-12 flex flex-col justify-between">
                      {/* British Council Section */}
                      <motion.div 
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="bg-white/90 backdrop-blur-md p-8 rounded-[2.5rem] border border-white shadow-xl group cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-6">
                          <img 
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/British_Council_logo.svg/512px-British_Council_logo.svg.png"
                            alt="British Council"
                            className="h-10 w-auto object-contain"
                            onError={(e) => (e.target as HTMLImageElement).src = 'https://www.google.com/s2/favicons?sz=128&domain=britishcouncil.org'}
                          />
                          <span className="px-3 py-1 bg-orange-50 text-primary text-[10px] font-black uppercase tracking-widest rounded-full border border-orange-100">Platinum</span>
                        </div>
                        <h4 className="text-slate-800 font-black text-lg mb-2">Platinum Partner</h4>
                        <p className="text-slate-500 text-sm font-medium leading-relaxed">Exclusive access to premium resources and fast-track booking systems.</p>
                        <div className="flex gap-1 mt-4">
                          {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 text-orange-400 fill-orange-400" />)}
                        </div>
                      </motion.div>

                      {/* Floating Badge in Middle */}
                      <div className="flex justify-center -my-4 relative z-20">
                        <motion.div 
                          whileHover={{ scale: 1.1, rotate: 360 }}
                          transition={{ duration: 0.8 }}
                          className="w-16 h-16 bg-gradient-to-br from-primary to-orange-600 rounded-2xl flex items-center justify-center shadow-2xl border-4 border-white"
                        >
                          <Sparkles className="text-white w-8 h-8" />
                        </motion.div>
                      </div>

                      {/* IDP Section */}
                      <motion.div 
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="bg-white/90 backdrop-blur-md p-8 rounded-[2.5rem] border border-white shadow-xl group cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-6">
                          <img 
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/IDP_Education_logo.svg/512px-IDP_Education_logo.svg.png"
                            alt="IDP"
                            className="h-10 w-auto object-contain"
                            onError={(e) => (e.target as HTMLImageElement).src = 'https://www.google.com/s2/favicons?sz=128&domain=idp.com'}
                          />
                          <span className="px-3 py-1 bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-slate-100 group-hover:text-primary group-hover:bg-orange-50 group-hover:border-orange-100 transition-colors">Official</span>
                        </div>
                        <h4 className="text-slate-800 font-black text-lg mb-2">Authorized Centre</h4>
                        <p className="text-slate-500 text-sm font-medium leading-relaxed">Direct registration and verification services for global university mobility.</p>
                        <div className="flex gap-1 mt-4">
                          {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 text-orange-400 fill-orange-400" />)}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Mobile View (Static but clean) */}
              <div className="lg:hidden flex flex-col gap-6 mt-10">
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl flex flex-col items-center text-center">
                   <img src="https://www.google.com/s2/favicons?sz=128&domain=britishcouncil.org" alt="BC" className="h-12 w-auto mb-4" />
                   <h4 className="font-black text-slate-800">Platinum Partner</h4>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl flex flex-col items-center text-center">
                   <img src="https://www.google.com/s2/favicons?sz=128&domain=idp.com" alt="IDP" className="h-12 w-auto mb-4" />
                   <h4 className="font-black text-slate-800">Official Center</h4>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>


        {/* Our IELTS Preparation Services */}
        <AnimatedSection className="py-24 bg-white relative">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="order-2 lg:order-1 relative"
              >
                <div className="absolute -inset-6 bg-gradient-to-tr from-primary/10 to-orange-100/50 rounded-[4rem] transform -rotate-3 blur-2xl" />
                <motion.div 
                  className="relative rounded-[3rem] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.15)] border-[8px] border-white group"
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 1.2 }}
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
                    alt="IELTS Class"
                    className="w-full h-full object-cover aspect-square md:aspect-[4/3]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div>
                      <h4 className="text-3xl font-black mb-3">Interactive Classrooms</h4>
                      <p className="text-white/90 text-lg font-medium">State-of-the-art facilities for better learning.</p>
                    </div>
                  </div>
                </motion.div>
                

              </motion.div>

              <div className="order-1 lg:order-2">
                <motion.span 
                  className="inline-block py-1.5 px-4 rounded-full bg-orange-100 text-primary font-bold text-xs uppercase tracking-widest mb-6 shadow-sm"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  What We Offer
                </motion.span>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-10 leading-[1.1]">Our Premium IELTS Preparation Services</h2>
                
                <StaggerContainer className="space-y-5 mb-10">
                  {[
                    'Complete IELTS preparation course',
                    'Academic and General IELTS training',
                    'Speaking practice with experts',
                    'Writing evaluation and feedback',
                    'Mock tests and exam simulation',
                    'Band score improvement strategies'
                  ].map((service, i) => (
                    <motion.div 
                      key={i} 
                      className="flex items-center gap-5 p-5 rounded-2xl hover:bg-orange-50 transition-all duration-300 group border border-transparent hover:border-orange-100 hover:shadow-sm cursor-pointer"
                      whileHover={{ x: 10 }}
                    >
                      <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm group-hover:rotate-6">
                        <Check className="w-5 h-5 text-primary group-hover:text-white" />
                      </div>
                      <span className="text-xl font-bold text-slate-700 group-hover:text-slate-900 transition-colors uppercase tracking-tight">{service}</span>
                    </motion.div>
                  ))}
                </StaggerContainer>


              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Why Choose FTI4Success - Premium Redesign */}
        <AnimatedSection className="py-32 bg-slate-900 relative overflow-hidden">
          {/* Main Background Banner Layer */}
          <div className="absolute inset-0 opacity-20">
            <img 
              src="/ielts_background_banner_1777899414460.png" 
              className="w-full h-full object-cover"
              alt="Background"
              onError={(e) => (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1600&auto=format&fit=crop'}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/80 to-slate-900" />
          </div>

          {/* Subtle Dynamic Background Layer */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div 
               animate={{ 
                 scale: [1, 1.2, 1],
                 opacity: [0.1, 0.2, 0.1]
               }}
               transition={{ duration: 15, repeat: Infinity }}
               className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(255,165,0,0.4)_0%,transparent_50%)]" 
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05] invert" />
          </div>

          {/* Floating 3D Icons Placeholder Layer */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 0.4, 0],
                  scale: [0.5, 1, 0.5],
                  y: [0, -100, 0],
                  x: [0, (i % 2 === 0 ? 50 : -50), 0]
                }}
                transition={{ 
                  duration: 10 + i * 2, 
                  repeat: Infinity, 
                  delay: i * 3,
                  ease: "easeInOut"
                }}
                className="absolute"
                style={{
                  top: `${20 + i * 15}%`,
                  left: `${10 + i * 15}%`,
                }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/20 blur-xl" />
              </motion.div>
            ))}
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-24">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 py-2 px-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-sm mb-8"
              >
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-white font-black text-[10px] uppercase tracking-[0.3em]">The FTI Advantage</span>
              </motion.div>
              <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter text-white leading-[0.9] md:leading-[0.85]">
                Why Choose <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-500 to-amber-500 italic">FTI4Success?</span>
              </h2>
              <p className="text-slate-400 text-lg md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
                We combine expert pedagogy with modern technology to deliver a preparation experience that guarantees your target band score.
              </p>
            </div>

            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { 
                  title: 'Expert IELTS Trainers', 
                  desc: 'Learn from BC/AEO certified masters with a decade of proven success.', 
                  icon: GraduationCap, 
                  img: '/expert_trainers_card_bg_1777899481198.png',
                  accent: 'from-orange-500/80 to-orange-600/80'
                },
                { 
                  title: 'Smart Exam Strategies', 
                  desc: 'Proprietary blueprints designed to tackle the latest 2024-25 exam patterns.', 
                  icon: Zap, 
                  img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop',
                  accent: 'from-amber-500/80 to-orange-500/80'
                },
                { 
                  title: 'Personal Mentorship', 
                  desc: 'Bespoke study plans and one-on-one sessions for focused improvement.', 
                  icon: Users, 
                  img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop',
                  accent: 'from-blue-500/80 to-indigo-600/80'
                },
                { 
                  title: 'Adaptive Mock Tests', 
                  desc: 'Weekly AI-integrated simulations that track your real-time performance.', 
                  icon: BookOpen, 
                  img: 'https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=800&auto=format&fit=crop',
                  accent: 'from-red-500/80 to-rose-600/80'
                },
                { 
                  title: 'University Admissions', 
                  desc: 'End-to-end support for global university applications and visa processing.', 
                  icon: Globe, 
                  img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop',
                  accent: 'from-green-500/80 to-emerald-600/80'
                },
                { 
                  title: 'Elite Track Record', 
                  desc: 'Join thousands of alumni who have secured 8.0+ bands under our guidance.', 
                  icon: Award, 
                  img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop',
                  accent: 'from-purple-500/80 to-violet-600/80'
                },
              ].map((reason, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                  }}
                  whileHover={{ y: -12 }}
                  className="group relative h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5"
                >
                  {/* Card Image Background */}
                  <div className="absolute inset-0">
                    <img 
                      src={reason.img} 
                      alt={reason.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop'}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${reason.accent} mix-blend-multiply opacity-60 group-hover:opacity-80 transition-opacity`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
                  </div>

                  {/* Card Content */}
                  <div className="relative h-full p-10 flex flex-col justify-end items-start text-left">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1 * i }}
                      className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 border border-white/20 group-hover:bg-primary group-hover:border-primary transition-all duration-300 shadow-xl"
                    >
                      <reason.icon className="w-7 h-7 text-white" />
                    </motion.div>
                    
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                      {reason.title}
                    </h3>
                    <p className="text-slate-300 text-sm md:text-base font-medium leading-relaxed opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 transition-all duration-500">
                      {reason.desc}
                    </p>

                    {/* Progress Bar Decoration */}
                    <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/10">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className={`h-full bg-gradient-to-r from-transparent to-white/50`} 
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </StaggerContainer>
          </div>
        </AnimatedSection>





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
              {cmsData.ieltsSuccessImages.map((src, i) => (
                  <div key={i} className="mx-5 flex-shrink-0 group">
                      <motion.div 
                          whileHover={{ scale: 1.05 }}
                          className="w-72 md:w-80 h-96 md:h-[420px] rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white hover:border-orange-200 transition-all duration-500 bg-white relative cursor-grab active:cursor-grabbing"
                      >
                          <img
                              src={src}
                              alt={`IELTS Achiever ${i + 1}`}
                              className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                              onError={(e) => {
                                // Fallback just in case they don't have images in public folder
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





        {/* Contact / Consultation Section */}
        <AnimatedSection className="py-20 bg-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring" }}
              className="max-w-5xl mx-auto bg-gradient-to-br from-slate-900 via-slate-800 to-black rounded-[3rem] p-8 md:p-14 shadow-[0_30px_100px_rgba(0,0,0,0.3)] relative overflow-hidden group"
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-orange-600/20 rounded-full blur-[80px] mix-blend-screen pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay pointer-events-none" />

              <div className="grid md:grid-cols-2 gap-10 items-center relative z-10">
                <div>
                  <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                    Ready to Book Your <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-400 italic">Free Consultation?</span>
                  </h2>
                  <p className="text-lg text-slate-300 mb-0 leading-relaxed font-medium">
                    Online & In-Person Classes Available. Join the biggest IELTS campus in Gujranwala division and start your journey today.
                  </p>
                </div>

                <StaggerContainer className="flex flex-col gap-4 mt-8 md:mt-0">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button size="lg" className="w-full h-16 text-lg font-black rounded-2xl shadow-[0_10px_30px_rgba(255,165,0,0.3)] hover:shadow-[0_15px_40px_rgba(255,165,0,0.5)] transition-all duration-300 bg-gradient-to-r from-primary to-orange-500 text-white border-none" asChild>
                      <Link to="/apply">Book Free Consultation <ArrowRight className="ml-3 w-5 h-5" /></Link>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="outline" size="lg" className="w-full h-16 text-lg font-black rounded-2xl border-2 border-white/20 bg-white/5 backdrop-blur-md text-white hover:bg-white hover:text-slate-900 transition-all duration-300 flex items-center justify-center gap-3" onClick={() => window.dispatchEvent(new CustomEvent('open-whatsapp-selector'))}>
                      <MessageCircle className="w-6 h-6 text-[#25D366] drop-shadow-[0_0_10px_rgba(37,211,102,0.8)] group-hover:scale-110 transition-transform" />
                      Chat on WhatsApp
                    </Button>
                  </motion.div>
                </StaggerContainer>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Sticky CTA for Mobile */}
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ delay: 1, type: "spring", stiffness: 100 }}
          className="md:hidden fixed bottom-6 left-6 right-6 z-50 flex justify-center"
        >
          <Button className="w-full h-16 rounded-2xl bg-gradient-to-r from-primary to-orange-500 text-white shadow-[0_20px_40px_rgba(255,165,0,0.4)] text-lg font-black border-none active:scale-95 transition-transform" asChild>
            <Link to="/apply">Book Demo Class Now</Link>
          </Button>
        </motion.div>
      </div>
    </Layout>
  );
};

export default IELTS;
