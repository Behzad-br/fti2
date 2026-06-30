import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, GraduationCap, Calendar, DollarSign, FileCheck, Clock, MapPin } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import useScrollReveal from '@/hooks/useScrollReveal';

const countryData: Record<string, {
  name: string;
  flag: string;
  image: string;
  overview: string;
  programs: string[];
  intakes: string[];
  requirements: string[];
  visaInfo: string;
  costs: { tuition: string; living: string };
  scholarships: string[];
}> = {
  uk: {
    name: 'United Kingdom',
    flag: '🇬🇧',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&h=600&fit=crop',
    overview: 'The UK is home to some of the world\'s most prestigious universities, including Oxford, Cambridge, and the Russell Group institutions. With a 2-year post-study work visa, rich culture, and globally recognized degrees, the UK remains a top choice for international students.',
    programs: ['Business & Management', 'Engineering', 'Computer Science', 'Healthcare', 'Law', 'Arts & Design'],
    intakes: ['September (Main)', 'January', 'May (Limited)'],
    requirements: ['IELTS 6.0-7.0', 'Academic transcripts', 'Statement of Purpose', 'LORs', 'Portfolio (if applicable)'],
    visaInfo: 'Student Visa (formerly Tier 4) allows you to study, work part-time (20hrs/week), and access the 2-year Graduate Route after completion.',
    costs: { tuition: '£12,000 - £35,000/year', living: '£1,000 - £1,500/month' },
    scholarships: ['Chevening Scholarship', 'Commonwealth Scholarship', 'GREAT Scholarships', 'University-specific scholarships'],
  },
  canada: {
    name: 'Canada',
    flag: '🇨🇦',
    image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=1200&h=600&fit=crop',
    overview: 'Canada offers affordable education, a clear pathway to permanent residency, and a welcoming multicultural society. With excellent co-op programs and the 3-year PGWP, Canada is ideal for students seeking quality education and immigration opportunities.',
    programs: ['Business', 'IT & Computer Science', 'Engineering', 'Healthcare', 'Hospitality', 'Environmental Studies'],
    intakes: ['September', 'January', 'May'],
    requirements: ['IELTS 6.0-6.5', 'Academic transcripts', 'SOP', 'Financial proof', 'Medical exam'],
    visaInfo: 'Study Permit allows work 20hrs/week during studies. PGWP (up to 3 years) after graduation opens PR pathways.',
    costs: { tuition: 'CAD 15,000 - 35,000/year', living: 'CAD 1,000 - 1,500/month' },
    scholarships: ['Vanier CGS', 'University scholarships', 'Provincial scholarships'],
  },
  australia: {
    name: 'Australia',
    flag: '🇦🇺',
    image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=1200&h=600&fit=crop',
    overview: 'Australia offers world-class education, excellent quality of life, and the opportunity to work while studying. With post-study work visas up to 6 years for certain programs, Australia is perfect for career-focused students.',
    programs: ['Business', 'Engineering', 'IT', 'Health Sciences', 'Education', 'Agriculture'],
    intakes: ['February', 'July'],
    requirements: ['IELTS 6.0-7.0', 'Academic documents', 'GTE statement', 'Financial capacity', 'Health insurance'],
    visaInfo: 'Student Visa (Subclass 500) allows 48hrs/fortnight work. Post-study work visa (485) for 2-6 years depending on qualification.',
    costs: { tuition: 'AUD 20,000 - 45,000/year', living: 'AUD 1,500 - 2,500/month' },
    scholarships: ['Australia Awards', 'Destination Australia', 'University scholarships'],
  },
  ireland: {
    name: 'Ireland',
    flag: '🇮🇪',
    image: 'https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?w=1200&h=600&fit=crop',
    overview: 'Ireland is Europe\'s tech hub, hosting HQs of Google, Facebook, Apple, and more. With excellent stay-back options, English as the primary language, and a growing economy, Ireland offers unique opportunities.',
    programs: ['Technology & IT', 'Business', 'Pharmaceuticals', 'Finance', 'Data Science', 'Engineering'],
    intakes: ['September', 'January'],
    requirements: ['IELTS 6.0-6.5', 'Academic transcripts', 'SOP', 'Financial proof', 'LORs'],
    visaInfo: '2-year stay-back (Third Level Graduate Scheme) after degree completion. Work 20hrs/week during term.',
    costs: { tuition: '€10,000 - €25,000/year', living: '€800 - €1,200/month' },
    scholarships: ['Government of Ireland Scholarship', 'University scholarships', 'Science Foundation Ireland'],
  },
  usa: {
    name: 'United States',
    flag: '🇺🇸',
    image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=1200&h=600&fit=crop',
    overview: 'The USA is home to the world\'s top universities and offers unmatched diversity in programs. With the OPT program allowing up to 3 years of work for STEM graduates, the US remains the ultimate destination for many students.',
    programs: ['Engineering', 'Business', 'Computer Science', 'Medicine', 'Research', 'Liberal Arts'],
    intakes: ['Fall (August-September)', 'Spring (January)', 'Summer (Limited)'],
    requirements: ['IELTS/TOEFL', 'GRE/GMAT (for graduate)', 'Academic transcripts', 'SOP', 'LORs', 'Financial documents'],
    visaInfo: 'F-1 Student Visa allows on-campus work. OPT provides 12 months work (36 months for STEM). CPT for internships.',
    costs: { tuition: '$15,000 - $55,000/year', living: '$1,000 - $2,000/month' },
    scholarships: ['Fulbright', 'University scholarships', 'Graduate assistantships'],
  },
  europe: {
    name: 'Europe',
    flag: '🇪🇺',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&h=600&fit=crop',
    overview: 'European countries like Germany, France, Netherlands, and others offer low or no tuition fees, high-quality education, and exposure to diverse cultures. With programs in English and Schengen travel access, Europe is increasingly popular.',
    programs: ['Engineering', 'Business', 'Sciences', 'Arts', 'Social Sciences', 'Medicine'],
    intakes: ['September/October', 'February/March'],
    requirements: ['IELTS 6.0-6.5', 'Academic transcripts', 'Motivation letter', 'CV', 'Language certificate (if applicable)'],
    visaInfo: 'Schengen Student Visa. Work rights vary by country (10-20hrs/week). Job seeker visa available in many countries.',
    costs: { tuition: '€0 - €20,000/year', living: '€700 - €1,200/month' },
    scholarships: ['Erasmus+', 'DAAD (Germany)', 'Holland Scholarship', 'Country-specific scholarships'],
  },
};

const CountryDetail = () => {
  const { country } = useParams();
  const { ref, isVisible } = useScrollReveal(0.1);
  
  const data = countryData[country || 'uk'];

  if (!data) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-3xl font-bold mb-4">Country not found</h1>
          <Link to="/destinations" className="text-primary hover:underline">
            View all destinations
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page-transition">
        {/* Hero */}
        <section className="relative h-[50vh] min-h-[400px]">
          <img
            src={data.image}
            alt={data.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 pb-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-5xl">{data.flag}</span>
                  <h1 className="text-4xl md:text-5xl font-bold text-white">
                    Study in {data.name}
                  </h1>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 bg-white" ref={ref}>
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Overview */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-2xl font-bold text-foreground mb-4">Overview</h2>
                  <p className="text-muted-foreground leading-relaxed">{data.overview}</p>
                </motion.div>

                {/* Popular Programs */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <GraduationCap className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-bold text-foreground">Popular Programs</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {data.programs.map((program) => (
                      <span key={program} className="bg-accent text-accent-foreground px-4 py-2 rounded-lg text-sm">
                        {program}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Intakes */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-bold text-foreground">Intakes</h2>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {data.intakes.map((intake) => (
                      <span key={intake} className="bg-primary/10 text-primary px-4 py-2 rounded-lg text-sm font-medium">
                        {intake}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Requirements */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <FileCheck className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-bold text-foreground">Basic Requirements</h2>
                  </div>
                  <ul className="space-y-2">
                    {data.requirements.map((req) => (
                      <li key={req} className="flex items-center gap-2 text-muted-foreground">
                        <ArrowRight className="h-4 w-4 text-primary" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Visa Info */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-bold text-foreground">Visa Overview</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{data.visaInfo}</p>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Cost Card */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-accent/50 rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <DollarSign className="h-6 w-6 text-primary" />
                    <h3 className="text-xl font-bold text-foreground">Estimated Costs</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Tuition Fee</p>
                      <p className="font-semibold text-foreground">{data.costs.tuition}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Living Cost</p>
                      <p className="font-semibold text-foreground">{data.costs.living}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Scholarships */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white rounded-2xl p-6 shadow-card"
                >
                  <h3 className="text-xl font-bold text-foreground mb-4">Scholarships</h3>
                  <ul className="space-y-2">
                    {data.scholarships.map((sch) => (
                      <li key={sch} className="text-sm text-muted-foreground">• {sch}</li>
                    ))}
                  </ul>
                </motion.div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="gradient-primary rounded-2xl p-6 text-white text-center"
                >
                  <h3 className="text-xl font-bold mb-2">Ready to Apply?</h3>
                  <p className="text-white/80 text-sm mb-4">
                    Get free counselling for {data.name}
                  </p>
                  <Button 
                    className="w-full bg-white text-primary hover:bg-white/90"
                    asChild
                  >
                    <Link to="/free-consultation">Apply Now</Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default CountryDetail;
