import { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import useScrollReveal from '@/hooks/useScrollReveal';
import { Plane, GraduationCap, Award, BookOpen, FileCheck, ArrowRight, Send, CheckCircle2, Star, Target, Zap } from 'lucide-react';
import { useCMS } from '@/context/CMSContext';

const services = [
  {
    id: 'counselling',
    icon: GraduationCap,
    title: 'Study Abroad Counselling',
    description: 'Personalized guidance to help you choose the right country, university, and program based on your academic background, career goals, and budget.',
    features: [
      'One-on-one counselling sessions',
      'Profile evaluation and gap analysis',
      'Country and university shortlisting',
      'Career path guidance',
      'Budget planning assistance',
    ],
  },
  {
    id: 'admissions',
    icon: FileCheck,
    title: 'Admission Processing',
    description: 'Complete application management from document preparation to offer letter, ensuring you present the strongest possible application.',
    features: [
      'Document checklist and review',
      'Statement of Purpose guidance',
      'Application form assistance',
      'University communication handling',
      'Offer letter acceptance support',
    ],
  },
  {
    id: 'visa',
    icon: Plane,
    title: 'Visa Guidance & Documentation',
    description: 'Expert visa application support with high success rate. We prepare you thoroughly for interviews and documentation.',
    features: [
      'Visa document preparation',
      'Financial documentation guidance',
      'Mock visa interviews',
      'Visa application submission support',
      'Post-visa assistance',
    ],
  },
  {
    id: 'ielts',
    icon: BookOpen,
    title: 'IELTS Preparation',
    description: 'Professional IELTS training with experienced faculty in state-of-the-art classrooms. Small batches ensure personalized attention.',
    features: [
      'All four modules covered',
      'Regular mock tests',
      'One-on-one speaking practice',
      'Band score prediction',
      'Flexible batch timings',
    ],
  },
  {
    id: 'pte',
    icon: BookOpen,
    title: 'PTE Preparation',
    description: 'Technology-based PTE training with AI-powered practice systems and individual online portals for comprehensive preparation.',
    features: [
      'Computer-based training',
      'AI scoring practice',
      'Individual portal access',
      'Pearson-aligned curriculum',
      'Unlimited practice tests',
    ],
  },
  {
    id: 'scholarship',
    icon: Award,
    title: 'Scholarship Guidance',
    description: 'Maximize your chances of securing scholarships with our expert guidance on applications, essays, and documentation.',
    features: [
      'Scholarship opportunity research',
      'Eligibility assessment',
      'Application essay guidance',
      'Document preparation',
      'Interview coaching',
    ],
  },
];

const Services = () => {
  const { ref, isVisible } = useScrollReveal(0.1);
  const [callbackPhone, setCallbackPhone] = useState('');
  const { cmsData } = useCMS();

  const handleCallback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackPhone.trim()) {
      toast({ title: 'Please enter your phone number', variant: 'destructive' });
      return;
    }
    toast({ title: 'Callback requested!', description: 'Our counsellor will call you soon.' });
    setCallbackPhone('');
  };

  return (
    <Layout>
      <div className="page-transition bg-[#0c0805]">
        {/* Dynamic Cinematic Hero */}
        <section className="min-h-[85vh] flex items-center relative overflow-hidden bg-slate-950 py-20 px-4">
          
          {/* Intense Vortex Background */}
          <div className="absolute inset-0 bg-[#0c0805]">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/30 via-transparent to-amber-500/10" />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle,rgba(249,115,22,0.1)_0%,transparent_60%)]"
            />
          </div>

          {/* Floating Atmospheric Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -100, 0],
                  x: [0, (i % 2 === 0 ? 50 : -50), 0],
                  opacity: [0, 0.4, 0],
                  scale: [1, 1.5, 1]
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  delay: Math.random() * 5
                }}
                className="absolute w-1 h-1 bg-orange-400 rounded-full blur-[1px]"
                style={{
                  top: Math.random() * 100 + "%",
                  left: Math.random() * 100 + "%"
                }}
              />
            ))}
          </div>

          <div className="container mx-auto relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-5xl mx-auto"
            >
              <div className="mb-8 inline-block">
                <motion.span 
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-black text-xs uppercase tracking-[0.4em] backdrop-blur-md"
                >
                  Premium Career Architecture
                </motion.span>
              </div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9]"
              >
                {cmsData.servicesHeroTitle.includes('.') ? (
                  <>{cmsData.servicesHeroTitle.split('.')[0]}. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300 italic">{cmsData.servicesHeroTitle.split('.').slice(1).join('.').trim()}</span></>
                ) : cmsData.servicesHeroTitle}
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl md:text-2xl text-slate-400 leading-relaxed max-w-3xl mx-auto font-medium"
              >
                {cmsData.servicesHeroDescription}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* High-Fidelity Floating Services Grid */}
        <section className="py-24 bg-[#0c0805] relative overflow-hidden" ref={ref}>
          {/* Section Glows */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[180px] -z-0" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-600/5 rounded-full blur-[150px] -z-0" />

            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-10 max-w-7xl mx-auto">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ y: -15, scale: 1.02 }}
                  className="group relative"
                >
                  {/* Ayar Glass Card - Precise Refinement */}
                  <div className="h-full bg-[#111111]/80 backdrop-blur-[40px] border border-white/10 rounded-[3rem] p-8 md:p-10 lg:p-12 flex flex-col transition-all duration-700 hover:bg-[#161616] hover:shadow-[0_60px_120px_-30px_rgba(251,146,60,0.3)] relative overflow-hidden">
                    
                    {/* Animated Glow Spot */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/15 rounded-full blur-[90px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    
                    {/* Floating Icon Base */}
                    <motion.div 
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
                      className="w-16 h-16 md:w-20 md:h-20 rounded-[1.5rem] md:rounded-[2rem] bg-gradient-to-br from-orange-500 to-amber-600 shadow-2xl shadow-orange-500/30 flex items-center justify-center mb-8 md:mb-12 group-hover:rotate-6 transition-transform duration-700"
                    >
                      <service.icon className="h-8 w-8 md:h-10 md:w-10 text-white" />
                    </motion.div>

                    <h3 className="text-2xl md:text-3xl font-black text-white mb-6 tracking-tighter leading-[1.1]">
                      {service.title}
                    </h3>

                    <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-8 md:mb-12 flex-grow font-medium">
                      {service.description}
                    </p>

                    <ul className="space-y-4 mb-10 md:mb-14">
                      {service.features.slice(0, 3).map((feature, i) => (
                        <li key={i} className="flex items-center gap-4 text-orange-50/50 text-[10px] md:text-xs font-black uppercase tracking-[0.25em]">
                          <div className="w-1 h-1 bg-primary rounded-[1px] shadow-[0_0_8px_rgba(249,115,22,1)] shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Premium Ayar Button */}
                    <Button 
                      onClick={() => toast({ title: "Strategy Session Requested", description: `Consultation starting for ${service.title}` })}
                      className="w-full h-14 md:h-16 rounded-full bg-primary hover:bg-orange-600 text-white font-black uppercase tracking-[0.3em] text-[10px] shadow-[0_20px_40px_-10px_rgba(249,115,22,0.4)] border border-white/10 group-hover:scale-[1.01] transition-all duration-500"
                    >
                      Start Strategy Session
                    </Button>
                  </div>

                  {/* Reflection Layer */}
                  <div className="absolute inset-0 rounded-[3rem] pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-tr from-white via-transparent to-transparent" />
                </motion.div>
              ))}
            </div>
        </section>

        {/* Compact Callback Footer */}
        <section className="py-20 bg-[#0c0805]">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-primary/10 backdrop-blur-3xl border border-primary/20 rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
              
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Need Instant Help?</h2>
              <p className="text-slate-300 text-xl mb-12">Drop your number and an architect will call you.</p>
              
              <form onSubmit={handleCallback} className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto relative z-10">
                <Input
                  placeholder="Your Elite Phone Number"
                  value={callbackPhone}
                  onChange={(e) => setCallbackPhone(e.target.value)}
                  className="h-16 rounded-2xl bg-black/40 border-white/10 text-white text-lg placeholder:text-slate-600"
                />
                <Button type="submit" className="h-16 px-10 rounded-2xl bg-primary hover:bg-orange-600 text-white font-black uppercase tracking-widest">
                  Request Callback
                </Button>
              </form>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Services;
