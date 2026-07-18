import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle, 
  GraduationCap, 
  DollarSign, 
  FileCheck, 
  MapPin, 
  BookOpen, 
  Briefcase, 
  Globe, 
  Percent, 
  Home, 
  Lightbulb,
  Building,
  Award,
  Calendar
, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import useScrollReveal from '@/hooks/useScrollReveal';
import { useRef } from 'react';

// Refined Animations
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 20 }
  }
};

const UKDetail = () => {
  const { ref, isVisible } = useScrollReveal(0.1);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <Layout>
      <div className="page-transition bg-[#FAFAFA] min-h-screen">
        
        {/* HERO SECTION - Parallax with floating elements */}
        <section ref={heroRef} className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden rounded-b-[3rem] shadow-2xl">
          <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
            <img
              src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200"
              alt="Study in the UK"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
          </motion.div>
          
          <div className="container relative z-10 mx-auto px-4 text-center mt-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-6"
            >
              <span className="text-xl">🇬🇧</span>
              <span className="text-white font-medium tracking-wide text-sm uppercase">Your Gateway to Excellence</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black text-white drop-shadow-2xl mb-6 tracking-tight"
            >
              Study in the <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">UK</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-2xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-md"
            >
              A World-Class Education. High Graduate Employability.
            </motion.p>
          </div>

          {/* Floating Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="absolute bottom-10 left-0 right-0 hidden md:flex justify-center gap-6 z-20 px-4"
          >
            {[
              { icon: Building, label: 'Intl. Students', value: '600,000+' },
              { icon: Globe, label: 'Graduate Route', value: '2-3 Years' },
              { icon: Award, label: 'Global Ranking', value: 'Top Tier' }
            ].map((stat, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 flex items-center gap-4 text-white shadow-2xl w-64 hover:-translate-y-2 transition-transform duration-300">
                <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-3 rounded-xl">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-xl font-bold">{stat.value}</p>
                  <p className="text-xs text-white/70 uppercase tracking-wider">{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* MAIN CONTENT AREA */}
        <section className="py-24 relative" ref={ref}>
          {/* Background Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-amber-400/5 rounded-full blur-[120px] translate-x-1/3" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-12 gap-12">
              
              {/* LEFT COLUMN - Main Content */}
              <div className="lg:col-span-8 space-y-16">
                
                {/* 1. Bento Box Photo Grid & Intro */}
                <motion.div
                  initial="hidden"
                  animate={isVisible ? "visible" : "hidden"}
                  variants={staggerContainer}
                >
                  <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
                    <span className="h-1 w-12 bg-primary rounded-full"></span>
                    <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">Discover the UK</h2>
                  </motion.div>
                  
                  <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed mb-6">
                    The United Kingdom (UK) is one of the world's most prestigious study destinations, renowned for its academic excellence, globally recognised qualifications, innovative teaching methods, and outstanding career opportunities. Home to some of the world's oldest and highest-ranked universities, the UK attracts over 600,000 international students each year.
                  </motion.p>
                  <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed mb-10">
                    At FTI Consultants, we guide students throughout their journey from selecting the right university and program to securing admission, scholarships, visa approval, and pre-departure support.
                  </motion.p>
                  
                  {/* Modern Editorial Bento Grid */}
                  <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[400px]">
                    <div className="md:col-span-2 h-full rounded-3xl overflow-hidden group relative shadow-lg">
                      <img src="https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=1200" alt="Oxford" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                        <span className="text-white font-bold text-xl drop-shadow-md">Historic Campuses</span>
                      </div>
                    </div>
                    <div className="grid grid-rows-2 gap-4 h-full">
                      <div className="rounded-3xl overflow-hidden group relative shadow-lg">
                        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600" alt="Students" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <div className="rounded-3xl overflow-hidden group relative shadow-lg bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center p-6 text-center">
                        <div>
                          <p className="text-4xl font-black text-white mb-2">PSW</p>
                          <p className="text-white/80 text-sm font-medium">Graduate Route</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* 2. Key Benefits - Glass Cards */}
                <motion.div
                  initial="hidden"
                  animate={isVisible ? "visible" : "hidden"}
                  variants={staggerContainer}
                >
                  <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-orange-500/20 text-white shadow-lg">
                      <Globe className="h-6 w-6" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">Why Study in the UK?</h2>
                  </motion.div>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      'Globally recognised qualifications',
                      'Universities ranked among the world\'s best',
                      'Shorter degree duration compared to many countries',
                      'High graduate employability',
                      'Multicultural learning environment',
                      'Strong industry links and practical learning',
                      'Excellent research opportunities',
                      'Post-study work opportunities',
                      'Gateway to international careers'
                    ].map((benefit, i) => (
                      <motion.div 
                        key={i} 
                        variants={fadeUp}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:border-primary/30 hover:shadow-[0_8px_30px_rgba(234,88,12,0.1)] transition-all duration-300"
                      >
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <CheckCircle className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-foreground font-medium text-sm">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* 3. Study Levels & Education System */}
                <motion.div
                  initial="hidden"
                  animate={isVisible ? "visible" : "hidden"}
                  variants={staggerContainer}
                  className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden"
                >
                  <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-primary/10 to-orange-500/5 rounded-full blur-3xl pointer-events-none" />
                  
                  <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8 relative z-10">
                    <div className="p-3 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-orange-500/20 text-white shadow-lg">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-foreground">UK Education System</h2>
                      <p className="text-muted-foreground mt-1 text-sm">Internationally respected for its quality, flexibility, and academic standards.</p>
                    </div>
                  </motion.div>

                  <div className="grid md:grid-cols-2 gap-10 relative z-10">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-5 flex items-center gap-2">
                        <ArrowRight className="h-5 w-5 text-primary" /> Study Levels & Duration
                      </h3>
                      <div className="space-y-3">
                        {[
                          { level: 'Foundation Programme', duration: '1 Year' },
                          { level: 'Undergraduate (Bachelor\'s)', duration: '3 Years (4 Years in Scotland)' },
                          { level: 'Integrated Master\'s', duration: '4 Years' },
                          { level: 'Taught Master\'s', duration: '1 Year' },
                          { level: 'Research Master\'s (MPhil)', duration: '1–2 Years' },
                          { level: 'Doctor of Philosophy (PhD)', duration: '3–4 Years' }
                        ].map((item, i) => (
                          <div key={i} className="flex justify-between items-center border-b border-gray-100 pb-2">
                            <span className="text-sm font-medium text-gray-700">{item.level}</span>
                            <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-md">{item.duration}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-5 flex items-center gap-2">
                        <ArrowRight className="h-5 w-5 text-primary" /> Major Intakes
                      </h3>
                      <ul className="space-y-3">
                        {[
                          { intake: 'September', desc: 'Main Intake' },
                          { intake: 'January', desc: 'Popular Secondary Intake' },
                          { intake: 'May', desc: 'Available at Selected Universities' }
                        ].map((intk, i) => (
                          <li key={i} className="flex items-center gap-3 text-muted-foreground group bg-gray-50 p-3 rounded-xl border border-gray-100">
                            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm">
                              <Calendar className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <span className="font-bold text-sm text-foreground block">{intk.intake}</span>
                              <span className="text-xs">{intk.desc}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* All Popular Programs */}
                <motion.div
                  initial="hidden"
                  animate={isVisible ? "visible" : "hidden"}
                  variants={staggerContainer}
                >
                  <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-orange-500/20 text-white shadow-lg">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">Popular Study Areas</h2>
                  </motion.div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        title: 'Business & Tech',
                        icon: Briefcase,
                        items: ['Business & Management', 'Accounting & Finance', 'Computer Science', 'Artificial Intelligence', 'Data Science', 'Cyber Security']
                      },
                      {
                        title: 'Health Sciences',
                        icon: CheckCircle,
                        items: ['Medicine', 'Nursing', 'Pharmacy', 'Public Health']
                      },
                      {
                        title: 'Engineering & Built',
                        icon: Building,
                        items: ['Engineering', 'Architecture']
                      },
                      {
                        title: 'Social Sciences',
                        icon: Home,
                        items: ['Law', 'Psychology', 'Education', 'Environmental Sciences']
                      },
                      {
                        title: 'Arts & Management',
                        icon: MapPin,
                        items: ['Digital Marketing', 'Hospitality & Tourism', 'Project Management', 'Creative Arts', 'Media & Communications']
                      }
                    ].map((category, i) => (
                      <motion.div 
                        key={i}
                        variants={fadeUp}
                        className="p-6 rounded-3xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-xl hover:border-primary/30 transition-all"
                      >
                        <h3 className="text-lg font-bold text-foreground mb-4 border-b border-gray-100 pb-3 flex items-center gap-2">
                          <category.icon className="w-5 h-5 text-primary" /> {category.title}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {category.items.map((item, j) => (
                            <span key={j} className="bg-gray-50 border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-medium">
                              {item}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* 4. Admission & Language Requirements */}
                <motion.div
                  initial="hidden"
                  animate={isVisible ? "visible" : "hidden"}
                  variants={staggerContainer}
                >
                  <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-orange-500/20 text-white shadow-lg">
                      <FileCheck className="h-6 w-6" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">Admission Requirements</h2>
                  </motion.div>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-12">
                    <motion.div variants={fadeUp} className="group relative bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-xl transition-all duration-300">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-200 to-gray-300 group-hover:from-primary group-hover:to-orange-500 transition-all duration-500 rounded-t-3xl" />
                      <h3 className="text-2xl font-bold text-foreground mb-6">Undergraduate</h3>
                      <ul className="space-y-4">
                        {[
                          'Secondary School Certificate', 
                          'Higher Secondary Certificate / A Levels / Equivalent', 
                          'Academic transcripts', 
                          'English language proficiency',
                          'Personal Statement (where applicable)',
                          'Letters of Recommendation'
                        ].map((req, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                              <div className="w-2 h-2 rounded-full bg-primary" />
                            </div>
                            <span className="text-muted-foreground font-medium text-sm">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>

                    <motion.div variants={fadeUp} className="group relative bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-xl transition-all duration-300">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-200 to-gray-300 group-hover:from-primary group-hover:to-orange-500 transition-all duration-500 rounded-t-3xl" />
                      <h3 className="text-2xl font-bold text-foreground mb-6">Postgraduate</h3>
                      <ul className="space-y-4">
                        {[
                          'Recognised Bachelor\'s degree', 
                          'Academic transcripts', 
                          'Updated CV/Resume', 
                          'Personal Statement & Letters of Rec', 
                          'English language proficiency',
                          'Portfolio (for creative programmes)',
                          'Work experience (e.g., for MBA)'
                        ].map((req, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                              <div className="w-2 h-2 rounded-full bg-primary" />
                            </div>
                            <span className="text-muted-foreground font-medium text-sm">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>

                  {/* English Requirements */}
                  <motion.div variants={fadeUp} className="bg-gradient-to-br from-primary/5 to-orange-500/5 rounded-[2rem] p-8 md:p-10 border border-primary/20 relative overflow-hidden">
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
                    <h3 className="text-2xl font-bold text-foreground mb-4">English Language Requirements</h3>
                    <p className="text-muted-foreground mb-6">
                      Accepted tests: IELTS Academic, PTE Academic, TOEFL iBT, LanguageCert, Cambridge English, Duolingo English Test.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { level: 'Foundation', score: '5.0–5.5 IELTS' },
                        { level: 'Undergraduate', score: '6.0–6.5 IELTS' },
                        { level: 'Postgraduate', score: '6.5–7.0 IELTS' }
                      ].map((req, i) => (
                        <motion.div 
                          key={i} 
                          whileHover={{ y: -5 }}
                          className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative z-10"
                        >
                          <span className="block text-sm text-muted-foreground mb-2">{req.level}</span>
                          <span className="block font-black text-primary text-xl">{req.score}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>

                {/* 5. Work and Career */}
                <motion.div
                  initial="hidden"
                  animate={isVisible ? "visible" : "hidden"}
                  variants={staggerContainer}
                >
                  <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-orange-500/20 text-white shadow-lg">
                      <Briefcase className="h-6 w-6" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">Work & Career Opportunities</h2>
                  </motion.div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div variants={fadeUp} className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
                      <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-primary" /> Part-Time Work
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">Students holding a Student visa may work while studying subject to conditions.</p>
                      <ul className="space-y-4">
                        {[
                          'Up to 20 hours per week during term time (degree-level students).',
                          'Full-time during official university vacations.',
                          'Paid internships/placements where included in the programme.'
                        ].map((text, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-1" />
                            <span className="text-sm text-muted-foreground">{text}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>

                    <motion.div variants={fadeUp} className="bg-gray-900 p-8 rounded-3xl shadow-xl text-white">
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Award className="w-5 h-5 text-amber-400" /> Graduate Route (Post-Study)
                      </h3>
                      <p className="text-sm text-gray-300 mb-4">
                        The UK offers excellent opportunities for graduates via the Graduate Route visa.
                      </p>
                      <ul className="space-y-4">
                        {[
                          'Bachelor\'s and Master\'s Graduates: Up to 2 years.',
                          'PhD Graduates: Up to 3 years.',
                          'Work, seek employment, or gain experience without employer sponsorship.'
                        ].map((text, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                            <span className="text-sm text-gray-300">{text}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                </motion.div>

              </div>

              {/* RIGHT COLUMN - Sidebar */}
              <div className="lg:col-span-4 space-y-6">
                  
                  {/* Financial Guide */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100"
                  >
                    <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
                      <div className="bg-primary/10 p-2.5 rounded-xl text-primary">
                        <DollarSign className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">Cost Overview</h3>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <p className="text-sm text-muted-foreground uppercase tracking-wider font-bold mb-3">Tuition Fees (Yearly GBP)</p>
                        <div className="space-y-3">
                          {[
                            { level: 'Foundation', fee: '£10k–£18k' },
                            { level: 'Bachelor\'s Degree', fee: '£12k–£25k' },
                            { level: 'Master\'s Degree', fee: '£13k–£30k' },
                            { level: 'MBA', fee: '£18k–£45k' },
                            { level: 'PhD', fee: '£15k–£30k' }
                          ].map((item, i) => (
                            <div key={i} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                              <span className="text-sm font-medium">{item.level}</span>
                              <span className="font-bold text-primary">{item.fee}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground uppercase tracking-wider font-bold mb-3">Living Cost (Yearly GBP)</p>
                        <div className="space-y-3">
                          {[
                            { item: 'London', cost: '£14k–£18k' },
                            { item: 'Outside London', cost: '£10k–£14k' }
                          ].map((item, i) => (
                            <div key={i} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                              <span className="text-sm font-medium">{item.item}</span>
                              <span className="font-bold text-primary">{item.cost}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Scholarships */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 shadow-xl text-white relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-700">
                      <Percent className="w-32 h-32" />
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <Award className="h-6 w-6 text-amber-400" /> Scholarships & Aid
                      </h3>
                      <ul className="space-y-4">
                        {[
                          'Merit & Academic Excellence',
                          'International Student Awards',
                          'Vice-Chancellor Scholarships',
                          'Early Payment Discounts',
                          'Regional & Country Specific',
                          'Alumni & Partner Discounts'
                        ].map((sch, i) => (
                          <li key={i} className="flex items-center gap-3 text-gray-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                            <span className="font-medium text-sm">{sch}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs text-gray-400 mt-4 italic">*Values range from £1,000 to full tuition coverage.</p>
                    </div>
                  </motion.div>

                  {/* Ultimate CTA */}
                  <div className="sticky top-24 z-10">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="gradient-primary rounded-3xl p-8 text-white text-center shadow-2xl shadow-primary/30 relative overflow-hidden"
                    >
                    <div className="absolute inset-0 bg-white/10 animate-pulse pointer-events-none" />
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/20 rounded-full blur-3xl pointer-events-none" />
                    
                    <h3 className="text-2xl font-black mb-3 relative z-10 text-glow">Why Choose FTI?</h3>
                    <p className="text-white/90 text-sm mb-6 relative z-10 leading-relaxed font-medium">
                      FTI Consultants provides comprehensive support throughout your study abroad journey.
                    </p>
                    <ul className="text-sm text-white/90 space-y-2 mb-8 text-left bg-black/20 p-4 rounded-xl relative z-10">
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" /> Admission Processing</li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" /> Student Visa Guidance</li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" /> Scholarship Assistance</li>
                    </ul>
                    <Button 
                      className="w-full bg-white text-primary hover:bg-gray-50 rounded-2xl py-7 text-lg font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98] relative z-10"
                      asChild
                    >
                      <Link to="/free-consultation">Get Free Consultation</Link>
                    </Button>

                  </motion.div>

                  {/* Disclaimer Card */}
                  <div className="mt-6 bg-orange-50/50 border border-orange-100 rounded-xl p-4 dark:bg-orange-950/20 dark:border-orange-900/50 relative z-10">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <Info className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                      </div>
                      <p className="text-xs text-orange-800 dark:text-orange-300 leading-relaxed font-medium">
                        Information may vary over time. Contact our team for the most up-to-date details.
                      </p>
                    </div>
                  </div>
                  </div>

              </div>

            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default UKDetail;
