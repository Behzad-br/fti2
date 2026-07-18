import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, GraduationCap, Calendar, DollarSign, FileCheck, MapPin, CheckCircle, Briefcase, BookOpen, Users, Award, Clock, Info } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import useScrollReveal from '@/hooks/useScrollReveal';

const countryData: Record<string, {
  name: string;
  flag: string;
  image: string;
  subtitle: string;
  overview: string;
  benefits: string[];
  educationSystem?: { qualification: string; duration: string }[];
  programs: string[];
  tuitionFees?: { level: string; fee: string }[];
  livingCosts?: { location: string; cost: string }[];
  englishRequirements?: { level: string; ielts: string }[];
  englishTests?: string[];
  admissionRequirements?: { category: string; items: string[] }[];
  intakes: { month: string; type: string }[];
  scholarships: string[];
  bursaries?: string[];
  partTimeWork?: string;
  postStudyWork?: string;
  visaInfo: string;
  costs: { tuition: string; living: string };
  whyFTI?: string[];
}> = {
  uk: {
    name: 'United Kingdom',
    flag: '🇬🇧',
    image: '/uk-banner.jpg',
    subtitle: 'Your Gateway to a World-Class Education',
    overview: 'The United Kingdom (UK) is one of the world\'s most prestigious study destinations, renowned for its academic excellence, globally recognised qualifications, innovative teaching methods, and outstanding career opportunities. Home to some of the world\'s oldest and highest-ranked universities, the UK attracts over 600,000 international students each year.\n\nAt FTI Consultants, we guide students throughout their journey from selecting the right university and program to securing admission, scholarships, visa approval, and pre-departure support.',
    benefits: [
      'Globally recognised qualifications',
      'Universities ranked among the world\'s best',
      'Shorter degree duration compared to many countries',
      'High graduate employability',
      'Multicultural learning environment',
      'Strong industry links and practical learning',
      'Excellent research opportunities',
      'Post-study work opportunities',
      'Gateway to international careers',
    ],
    educationSystem: [
      { qualification: 'Foundation Programme', duration: '1 Year' },
      { qualification: 'Undergraduate (Bachelor\'s)', duration: '3 Years (4 Years in Scotland or Placement Programmes)' },
      { qualification: 'Integrated Master\'s', duration: '4 Years' },
      { qualification: 'Taught Master\'s', duration: '1 Year' },
      { qualification: 'Research Master\'s (MPhil/MRes)', duration: '1–2 Years' },
      { qualification: 'Doctor of Philosophy (PhD)', duration: '3–4 Years' },
    ],
    programs: [
      'Business & Management', 'Accounting & Finance', 'Computer Science', 'Artificial Intelligence',
      'Data Science', 'Cyber Security', 'Engineering', 'Medicine', 'Nursing', 'Pharmacy',
      'Public Health', 'Law', 'Architecture', 'Psychology', 'Education', 'Digital Marketing',
      'Hospitality & Tourism', 'Project Management', 'Creative Arts', 'Media & Communications',
      'Environmental Sciences',
    ],
    tuitionFees: [
      { level: 'Foundation', fee: '£10,000 – £18,000' },
      { level: 'Bachelor\'s Degree', fee: '£12,000 – £25,000' },
      { level: 'Master\'s Degree', fee: '£13,000 – £30,000' },
      { level: 'MBA', fee: '£18,000 – £45,000' },
      { level: 'PhD', fee: '£15,000 – £30,000' },
    ],
    livingCosts: [
      { location: 'London', cost: '£14,000 – £18,000 per year' },
      { location: 'Outside London', cost: '£10,000 – £14,000 per year' },
    ],
    englishTests: [
      'IELTS Academic',
      'PTE Academic',
      'TOEFL iBT',
      'LanguageCert Academic',
      'Cambridge English Qualifications',
      'Duolingo English Test (accepted by many universities)',
    ],
    englishRequirements: [
      { level: 'Foundation', ielts: '5.0–5.5' },
      { level: 'Undergraduate', ielts: '6.0–6.5' },
      { level: 'Postgraduate', ielts: '6.5–7.0' },
    ],
    admissionRequirements: [
      {
        category: 'Undergraduate',
        items: [
          'Secondary School Certificate',
          'Higher Secondary Certificate / A Levels / Equivalent',
          'Academic transcripts',
          'English language proficiency',
          'Personal Statement (where applicable)',
          'Letters of Recommendation (selected programmes)',
        ],
      },
      {
        category: 'Postgraduate',
        items: [
          'Recognised Bachelor\'s degree',
          'Academic transcripts',
          'Updated CV/Resume',
          'Personal Statement',
          'Letters of Recommendation',
          'English language proficiency',
          'Portfolio (for creative programmes)',
          'Work experience (for selected programmes such as MBA)',
        ],
      },
    ],
    intakes: [
      { month: 'September', type: 'Main Intake' },
      { month: 'January', type: 'Popular Secondary Intake' },
      { month: 'May', type: 'Available at Selected Universities' },
    ],
    scholarships: [
      'Merit Scholarships',
      'Academic Excellence Scholarships',
      'International Student Scholarships',
      'Country-Specific Scholarships',
      'Vice-Chancellor Scholarships',
      'Alumni Scholarships',
      'Faculty Scholarships',
      'Sports Scholarships',
      'Research Funding',
      'Government Scholarships (where applicable)',
    ],
    bursaries: [
      'Early Payment Discounts',
      'Early Confirmation Awards',
      'International Bursaries',
      'Alumni Discounts',
      'Regional Scholarships',
      'Family Discounts (selected universities)',
      'Partner Institution Discounts',
    ],
    partTimeWork: 'International students holding a Student visa are generally permitted to work up to 20 hours per week during term time (for eligible degree-level students), full-time during official university vacations, and in paid internships or placements where included in the programme. Students should always comply with the conditions stated on their visa.',
    postStudyWork: 'The UK offers excellent opportunities for graduates to gain international work experience. Eligible graduates may apply for the Graduate Route, allowing them to remain in the UK after successfully completing their studies. Bachelor\'s and Master\'s Graduates can stay for up to 2 years, while PhD Graduates can stay for up to 3 years. The Graduate Route allows eligible graduates to work, seek employment, or gain valuable professional experience without requiring employer sponsorship during the visa\'s validity.',
    visaInfo: 'Student Visa (formerly Tier 4) allows you to study, work part-time (20hrs/week during term), and access the Graduate Route after completion — 2 years for UG/PG and 3 years for PhD graduates.',
    costs: { tuition: '£12,000 – £45,000/year', living: '£10,000 – £18,000/year' },
    whyFTI: [
      'Career Counselling',
      'University Selection',
      'Course Guidance',
      'Admission Processing',
      'Scholarship Assistance',
      'Student Visa Guidance',
      'Financial Documentation Support',
      'Interview Preparation',
      'Accommodation Guidance',
      'Pre-Departure Briefing',
      'Ongoing Student Support',
    ],
  },
  canada: {
    name: 'Canada',
    flag: '🇨🇦',
    image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=1200&h=600&fit=crop',
    subtitle: 'Affordable Education with PR Pathway',
    overview: 'Canada offers affordable education, a clear pathway to permanent residency, and a welcoming multicultural society. With excellent co-op programs and the 3-year PGWP, Canada is ideal for students seeking quality education and immigration opportunities.',
    benefits: ['Clear PR pathway', 'Co-op programs', 'Affordable fees', 'Multicultural society', 'Safe environment'],
    programs: ['Business', 'IT & Computer Science', 'Engineering', 'Healthcare', 'Hospitality', 'Environmental Studies'],
    intakes: [
      { month: 'September', type: 'Main Intake' },
      { month: 'January', type: 'Secondary Intake' },
      { month: 'May', type: 'Limited Intake' },
    ],
    visaInfo: 'Study Permit allows work 20hrs/week during studies. PGWP (up to 3 years) after graduation opens PR pathways.',
    costs: { tuition: 'CAD 15,000 – 35,000/year', living: 'CAD 12,000 – 18,000/year' },
    scholarships: ['Vanier CGS', 'University scholarships', 'Provincial scholarships', 'Entrance scholarships'],
  },
  australia: {
    name: 'Australia',
    flag: '🇦🇺',
    image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=1200&h=600&fit=crop',
    subtitle: 'World-Class Education & Excellent Lifestyle',
    overview: 'Australia offers world-class education, excellent quality of life, and the opportunity to work while studying. With post-study work visas up to 6 years for certain programs, Australia is perfect for career-focused students.',
    benefits: ['Post-study work up to 6 years', 'Work while studying', 'High quality of life', 'Excellent research', 'Diverse culture'],
    programs: ['Business', 'Engineering', 'IT', 'Health Sciences', 'Education', 'Agriculture'],
    intakes: [
      { month: 'February', type: 'Main Intake' },
      { month: 'July', type: 'Secondary Intake' },
    ],
    visaInfo: 'Student Visa (Subclass 500) allows 48hrs/fortnight work. Post-study work visa (485) for 2–6 years depending on qualification.',
    costs: { tuition: 'AUD 20,000 – 45,000/year', living: 'AUD 18,000 – 30,000/year' },
    scholarships: ['Australia Awards', 'Destination Australia', 'University scholarships', 'Research scholarships'],
  },
  ireland: {
    name: 'Ireland',
    flag: '🇮🇪',
    image: 'https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?w=1200&h=600&fit=crop',
    subtitle: 'Europe\'s Tech Hub & English-Speaking Destination',
    overview: 'Ireland is Europe\'s tech hub, hosting HQs of Google, Facebook, Apple, and more. With excellent stay-back options, English as the primary language, and a growing economy, Ireland offers unique opportunities for international students.',
    benefits: ['2-year stay-back option', 'Tech companies HQ', 'English-speaking', 'EU member state', 'Growing economy'],
    programs: ['Technology & IT', 'Business', 'Pharmaceuticals', 'Finance', 'Data Science', 'Engineering'],
    intakes: [
      { month: 'September', type: 'Main Intake' },
      { month: 'January', type: 'Secondary Intake' },
    ],
    visaInfo: '2-year stay-back (Third Level Graduate Scheme) after degree completion. Work 20hrs/week during term.',
    costs: { tuition: '€10,000 – €25,000/year', living: '€9,600 – €14,400/year' },
    scholarships: ['Government of Ireland Scholarship', 'University scholarships', 'Science Foundation Ireland', 'Enterprise Ireland'],
  },
  usa: {
    name: 'United States',
    flag: '🇺🇸',
    image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=1200&h=600&fit=crop',
    subtitle: 'Home to the World\'s Top Universities',
    overview: 'The USA is home to the world\'s top universities and offers unmatched diversity in programs. With the OPT program allowing up to 3 years of work for STEM graduates, the US remains the ultimate destination for many students worldwide.',
    benefits: ['World top universities', 'OPT up to 3 years for STEM', 'Diverse programs', 'Research excellence', 'Global career opportunities'],
    programs: ['Engineering', 'Business', 'Computer Science', 'Medicine', 'Research', 'Liberal Arts'],
    intakes: [
      { month: 'Fall (Aug–Sep)', type: 'Main Intake' },
      { month: 'Spring (January)', type: 'Secondary Intake' },
      { month: 'Summer', type: 'Limited Intake' },
    ],
    visaInfo: 'F-1 Student Visa allows on-campus work. OPT provides 12 months work (36 months for STEM). CPT for internships during studies.',
    costs: { tuition: '$15,000 – $55,000/year', living: '$12,000 – $24,000/year' },
    scholarships: ['Fulbright Scholarship', 'University scholarships', 'Graduate assistantships', 'Research fellowships'],
  },
  hungary: {
    name: 'Hungary',
    flag: '🇭🇺',
    image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=1200&h=600&fit=crop',
    subtitle: 'Affordable European Education in the Heart of Europe',
    overview: 'Hungary offers affordable, high-quality European education with internationally recognised degrees. Located in the heart of Europe with Schengen access, Hungary is an increasingly popular destination for international students seeking quality education at lower cost.',
    benefits: ['Affordable tuition fees', 'Schengen zone access', 'EU recognised degrees', 'Rich cultural heritage', 'Safe environment'],
    programs: ['Medicine', 'Engineering', 'Business', 'IT', 'Dentistry', 'Pharmacy'],
    intakes: [
      { month: 'September', type: 'Main Intake' },
      { month: 'February', type: 'Secondary Intake' },
    ],
    visaInfo: 'Student Residence Permit allows study and limited work rights. Post-study job search visa available.',
    costs: { tuition: '€3,000 – €8,000/year', living: '€6,000 – €9,600/year' },
    scholarships: ['Stipendium Hungaricum', 'University scholarships', 'Merit scholarships', 'Government scholarships'],
  },
  turkey: {
    name: 'Turkey',
    flag: '🇹🇷',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200&h=600&fit=crop',
    subtitle: 'Growing Education Hub with Affordable Fees',
    overview: 'Turkey is a rapidly growing education hub with over 200 universities offering quality programs at very affordable fees. Located at the crossroads of Europe and Asia, Turkey offers a unique cultural experience along with world-class education.',
    benefits: ['Very affordable fees', '200+ universities', 'Scholarships available', 'Strategic location', 'Rich culture'],
    programs: ['Engineering', 'Business', 'Medicine', 'Architecture', 'Arts', 'Social Sciences'],
    intakes: [
      { month: 'September', type: 'Main Intake' },
      { month: 'February', type: 'Secondary Intake' },
    ],
    visaInfo: 'Student Residence Permit for the duration of studies. Part-time work allowed with permit.',
    costs: { tuition: '$3,000 – $10,000/year', living: '$4,800 – $8,400/year' },
    scholarships: ['Türkiye Scholarships', 'University merit scholarships', 'Faculty scholarships', 'Research grants'],
  },
  finland: {
    name: 'Finland',
    flag: '🇫🇮',
    image: 'https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?w=1200&h=600&fit=crop',
    subtitle: 'Top-Ranked Education System in Northern Europe',
    overview: 'Finland is renowned for having one of the world\'s best education systems, with a focus on innovation, research, and student wellbeing. Finnish universities offer world-class programs in a safe, clean, and technologically advanced environment.',
    benefits: ['Top education system', 'Innovation focused', 'Safe environment', 'Research excellence', 'High quality of life'],
    programs: ['Engineering', 'Technology', 'Business', 'Design', 'Education', 'Environmental Sciences'],
    intakes: [
      { month: 'September', type: 'Main Intake' },
      { month: 'January', type: 'Secondary Intake (selected universities)' },
    ],
    visaInfo: 'Residence Permit for studies. Post-study job search permit available. Work 25hrs/week during studies.',
    costs: { tuition: '€8,000 – €18,000/year', living: '€9,600 – £14,400/year' },
    scholarships: ['Finnish Government Scholarships', 'University scholarships', 'CIMO fellowships', 'Research grants'],
  },
  cyprus: {
    name: 'Cyprus',
    flag: '🇨🇾',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200',
    subtitle: 'English-Taught Programs in the Mediterranean',
    overview: 'Cyprus offers EU-recognised degrees through English-taught programs in a beautiful Mediterranean setting. As an EU member state, Cyprus provides students with internationally recognised qualifications and a vibrant student lifestyle.',
    benefits: ['EU recognised degrees', 'English-taught programs', 'Mediterranean lifestyle', 'Safe country', 'Affordable cost'],
    programs: ['Business', 'Law', 'Computer Science', 'Engineering', 'Hotel Management', 'Education'],
    intakes: [
      { month: 'September', type: 'Main Intake' },
      { month: 'January', type: 'Secondary Intake' },
    ],
    visaInfo: 'Temporary Residence Permit for duration of studies. Work up to 20hrs/week during term.',
    costs: { tuition: '€5,000 – €12,000/year', living: '€8,400 – £12,000/year' },
    scholarships: ['University merit scholarships', 'Early application scholarships', 'International student awards', 'Academic excellence grants'],
  },
  malaysia: {
    name: 'Malaysia',
    flag: '🇲🇾',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1200&h=600&fit=crop',
    subtitle: 'Affordable Asian Education Hub',
    overview: 'Malaysia is one of Asia\'s most popular education destinations, offering high-quality, affordable education through its many universities including branch campuses of leading UK, Australian, and US universities. English is widely used in education and business.',
    benefits: ['Very affordable fees', 'Branch campuses of top universities', 'English-medium instruction', 'Multicultural environment', 'Low cost of living'],
    programs: ['Business', 'Engineering', 'IT', 'Medicine', 'Hospitality', 'Creative Arts'],
    intakes: [
      { month: 'March', type: 'Main Intake' },
      { month: 'July', type: 'Secondary Intake' },
      { month: 'October', type: 'Third Intake' },
    ],
    visaInfo: 'Student Pass for duration of studies. Limited work rights available for eligible students.',
    costs: { tuition: '$4,000 – $12,000/year', living: '$4,800 – $9,600/year' },
    scholarships: ['Malaysian Government scholarships', 'University scholarships', 'Merit awards', 'International student bursaries'],
  },
  sweden: {
    name: 'Sweden',
    flag: '🇸🇪',
    image: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=1200&h=600&fit=crop',
    subtitle: 'Innovation & Sustainability Focused Education',
    overview: 'Sweden is a world leader in innovation, technology, and sustainability. Swedish universities offer excellent English-taught programs with a focus on critical thinking, creativity, and practical skills. Sweden consistently ranks among the top countries for quality of life.',
    benefits: ['Innovation focused', 'English-taught programs', 'High quality of life', 'Strong research', 'Sustainable living'],
    programs: ['Engineering', 'Technology', 'Business', 'Design', 'Environmental Science', 'Social Sciences'],
    intakes: [
      { month: 'September', type: 'Main Intake' },
      { month: 'January', type: 'Secondary Intake' },
    ],
    visaInfo: 'Residence Permit for studies. Job search permit available after graduation. Work alongside studies permitted.',
    costs: { tuition: '€10,000 – €20,000/year', living: '€10,800 – £16,800/year' },
    scholarships: ['Swedish Institute Scholarships', 'University scholarships', 'Research grants', 'Merit-based awards'],
  },
  'new-zealand': {
    name: 'New Zealand',
    flag: '🇳🇿',
    image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=1200&h=600&fit=crop',
    subtitle: 'Safe, Welcoming Country with Stunning Natural Beauty',
    overview: 'New Zealand offers world-class education in one of the safest and most beautiful countries in the world. With a 3-year post-study work visa, the ability to work while studying, and a welcoming culture, New Zealand is an ideal destination for international students.',
    benefits: ['Up to 3-year Post Study Work Visa', 'Work while studying', 'Extremely safe country', 'Beautiful natural environment', 'Welcoming culture'],
    programs: ['Agriculture', 'Engineering', 'Business', 'IT', 'Health Sciences', 'Creative Arts'],
    intakes: [
      { month: 'February', type: 'Main Intake' },
      { month: 'July', type: 'Secondary Intake' },
    ],
    visaInfo: 'Student Visa for duration of studies. Post Study Work Visa for up to 3 years. Work 20hrs/week during term.',
    costs: { tuition: '$18,000 – $28,000/year', living: '$14,400 – £21,600/year' },
    scholarships: ['NZ Government Scholarships', 'University scholarships', 'Merit awards', 'Research grants'],
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

  const isUK = country === 'uk';

  return (
    <Layout>
      <div className="page-transition">
        {/* Hero */}
        <section className="relative h-[55vh] min-h-[420px]">
          <img
            src={data.image}
            alt={data.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 pb-14">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-5xl">{data.flag}</span>
                  <div>
                    <p className="text-white/70 text-sm font-medium uppercase tracking-widest mb-1">Study Destination</p>
                    <h1 className="text-4xl md:text-5xl font-bold text-white">
                      Study in {data.name}
                    </h1>
                  </div>
                </div>
                {data.subtitle && (
                  <p className="text-white/80 text-lg mt-3 ml-16">{data.subtitle}</p>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 bg-white" ref={ref}>
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
                  <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <BookOpen className="h-6 w-6 text-primary" /> Overview
                  </h2>
                  {data.overview.split('\n\n').map((para, i) => (
                    <p key={i} className="text-muted-foreground leading-relaxed mb-3">{para}</p>
                  ))}
                </motion.div>

                {/* Benefits */}
                {data.benefits && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.05 }}
                  >
                    <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                      <CheckCircle className="h-6 w-6 text-primary" /> Why Study in {data.name}?
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {data.benefits.map((benefit) => (
                        <div key={benefit} className="flex items-start gap-2 bg-accent/40 rounded-lg p-3">
                          <ArrowRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span className="text-sm text-foreground">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Education System Table */}
                {data.educationSystem && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                      <GraduationCap className="h-6 w-6 text-primary" /> UK Education System
                    </h2>
                    <p className="text-muted-foreground mb-4">The UK education system is internationally respected for its quality, flexibility, and academic standards.</p>
                    <div className="overflow-x-auto rounded-xl border border-border">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-primary text-white">
                            <th className="text-left px-4 py-3 font-semibold">Qualification</th>
                            <th className="text-left px-4 py-3 font-semibold">Typical Duration</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.educationSystem.map((row, i) => (
                            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-accent/30'}>
                              <td className="px-4 py-3 text-foreground font-medium">{row.qualification}</td>
                              <td className="px-4 py-3 text-muted-foreground">{row.duration}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-muted-foreground text-sm mt-3">Students can choose from thousands of programmes offered by public universities, private institutions, and specialist colleges across England, Scotland, Wales, and Northern Ireland.</p>
                  </motion.div>
                )}

                {/* Popular Programs */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.15 }}
                >
                  <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
                    <BookOpen className="h-6 w-6 text-primary" /> Popular Study Areas
                  </h2>
                  {isUK && <p className="text-muted-foreground mb-4">UK universities offer more than 50,000 academic programmes across diverse disciplines.</p>}
                  <div className="flex flex-wrap gap-2">
                    {data.programs.map((program) => (
                      <span key={program} className="bg-accent text-accent-foreground px-3 py-1.5 rounded-lg text-sm font-medium">
                        {program}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Tuition Fees Table */}
                {data.tuitionFees && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
                      <DollarSign className="h-6 w-6 text-primary" /> Tuition Fees
                    </h2>
                    <p className="text-muted-foreground mb-4">Tuition fees vary depending on the university, programme, and level of study.</p>
                    <div className="overflow-x-auto rounded-xl border border-border">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-primary text-white">
                            <th className="text-left px-4 py-3 font-semibold">Study Level</th>
                            <th className="text-left px-4 py-3 font-semibold">Approximate Annual Tuition Fee</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.tuitionFees.map((row, i) => (
                            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-accent/30'}>
                              <td className="px-4 py-3 text-foreground font-medium">{row.level}</td>
                              <td className="px-4 py-3 text-muted-foreground">{row.fee}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-muted-foreground text-sm mt-3">Highly specialised programmes such as Medicine, Dentistry, and Veterinary Sciences may have higher tuition fees.</p>
                  </motion.div>
                )}

                {/* Living Costs */}
                {data.livingCosts && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.22 }}
                  >
                    <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
                      <MapPin className="h-6 w-6 text-primary" /> Living Expenses
                    </h2>
                    <p className="text-muted-foreground mb-4">Students should budget for accommodation, food, transport, and personal expenses.</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {data.livingCosts.map((item) => (
                        <div key={item.location} className="bg-accent/40 rounded-xl p-4 border border-border">
                          <p className="font-semibold text-foreground mb-1">{item.location}</p>
                          <p className="text-primary font-bold">{item.cost}</p>
                        </div>
                      ))}
                    </div>
                    <p className="text-muted-foreground text-sm mt-3">Actual expenses vary according to lifestyle and location.</p>
                  </motion.div>
                )}

                {/* English Requirements */}
                {data.englishTests && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.25 }}
                  >
                    <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
                      <FileCheck className="h-6 w-6 text-primary" /> English Language Requirements
                    </h2>
                    <p className="text-muted-foreground mb-4">Most UK universities require proof of English language proficiency. Accepted tests include:</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {data.englishTests.map((test) => (
                        <span key={test} className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium border border-primary/20">
                          {test}
                        </span>
                      ))}
                    </div>
                    {data.englishRequirements && (
                      <>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Typical IELTS Requirements</h3>
                        <div className="overflow-x-auto rounded-xl border border-border">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-primary text-white">
                                <th className="text-left px-4 py-3 font-semibold">Study Level</th>
                                <th className="text-left px-4 py-3 font-semibold">Overall IELTS</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data.englishRequirements.map((row, i) => (
                                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-accent/30'}>
                                  <td className="px-4 py-3 text-foreground font-medium">{row.level}</td>
                                  <td className="px-4 py-3 text-muted-foreground">{row.ielts}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <p className="text-muted-foreground text-sm mt-3">Some universities may waive English language requirements for eligible applicants based on previous education or recognised qualifications.</p>
                      </>
                    )}
                  </motion.div>
                )}

                {/* Admission Requirements */}
                {data.admissionRequirements && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                      <FileCheck className="h-6 w-6 text-primary" /> Admission Requirements
                    </h2>
                    <p className="text-muted-foreground mb-4">Admission requirements vary by institution and programme. Common requirements include:</p>
                    <div className="grid sm:grid-cols-2 gap-6">
                      {data.admissionRequirements.map((cat) => (
                        <div key={cat.category} className="bg-accent/30 rounded-xl p-5 border border-border">
                          <h3 className="font-bold text-foreground text-lg mb-3 text-primary">{cat.category}</h3>
                          <ul className="space-y-2">
                            {cat.items.map((item) => (
                              <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <ArrowRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Intakes */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.35 }}
                >
                  <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Calendar className="h-6 w-6 text-primary" /> Intakes in the {data.name === 'United Kingdom' ? 'UK' : data.name}
                  </h2>
                  {isUK && <p className="text-muted-foreground mb-4">Most universities offer multiple admission cycles throughout the year.</p>}
                  <div className="overflow-x-auto rounded-xl border border-border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-primary text-white">
                          <th className="text-left px-4 py-3 font-semibold">Intake</th>
                          <th className="text-left px-4 py-3 font-semibold">Typical Commencement</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.intakes.map((intake, i) => (
                          <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-accent/30'}>
                            <td className="px-4 py-3 text-foreground font-medium">{intake.month}</td>
                            <td className="px-4 py-3 text-muted-foreground">{intake.type}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {isUK && <p className="text-muted-foreground text-sm mt-3">Programme availability differs between universities.</p>}
                </motion.div>

                {/* Part-Time Work */}
                {data.partTimeWork && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.38 }}
                  >
                    <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                      <Briefcase className="h-6 w-6 text-primary" /> Part-Time Work During Study
                    </h2>
                    <div className="bg-accent/30 rounded-xl p-5 border border-border">
                      <p className="text-muted-foreground leading-relaxed">{data.partTimeWork}</p>
                    </div>
                  </motion.div>
                )}

                {/* Post-Study Work */}
                {data.postStudyWork && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                      <Clock className="h-6 w-6 text-primary" /> Post-Study Work Opportunities
                    </h2>
                    <div className="bg-primary/5 rounded-xl p-5 border border-primary/20">
                      <p className="text-muted-foreground leading-relaxed">{data.postStudyWork}</p>
                      <div className="grid sm:grid-cols-2 gap-3 mt-4">
                        <div className="bg-white rounded-lg p-3 text-center border border-border">
                          <p className="font-bold text-primary text-lg">Up to 2 Years</p>
                          <p className="text-sm text-muted-foreground">Bachelor's & Master's Graduates</p>
                        </div>
                        <div className="bg-white rounded-lg p-3 text-center border border-border">
                          <p className="font-bold text-primary text-lg">Up to 3 Years</p>
                          <p className="text-sm text-muted-foreground">PhD Graduates</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Visa Info (for non-UK) */}
                {!data.partTimeWork && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                      <MapPin className="h-6 w-6 text-primary" /> Visa Overview
                    </h2>
                    <div className="bg-accent/30 rounded-xl p-5 border border-border">
                      <p className="text-muted-foreground leading-relaxed">{data.visaInfo}</p>
                    </div>
                  </motion.div>
                )}

                {/* Why FTI */}
                {data.whyFTI && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.45 }}
                    className="bg-primary/5 rounded-2xl p-6 border border-primary/15"
                  >
                    <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
                      <Users className="h-6 w-6 text-primary" /> Why Choose FTI Consultants?
                    </h2>
                    <p className="text-muted-foreground mb-4">FTI Consultants provides comprehensive support throughout your study abroad journey. Our services include:</p>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {data.whyFTI.map((service) => (
                        <div key={service} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                          <span className="text-sm text-foreground">{service}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* CTA Banner */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="gradient-primary rounded-2xl p-8 text-white text-center"
                >
                  <h2 className="text-2xl font-bold mb-2">Start Your {data.name === 'United Kingdom' ? 'UK' : data.name} Journey Today</h2>
                  <p className="text-white/80 mb-6 max-w-xl mx-auto">
                    Whether you are planning to pursue an undergraduate degree, postgraduate qualification, or research programme, FTI Consultants is committed to helping you make informed decisions and achieve your international education goals.
                  </p>
                  <Button className="bg-white text-primary hover:bg-white/90 font-semibold px-8" asChild>
                    <Link to="/free-consultation">Contact Our Expert Counsellors</Link>
                  </Button>
                </motion.div>

              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Cost Card */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-accent/50 rounded-2xl p-6 sticky top-24"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <DollarSign className="h-6 w-6 text-primary" />
                    <h3 className="text-xl font-bold text-foreground">Estimated Costs</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white rounded-xl p-3 border border-border">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Tuition Fee</p>
                      <p className="font-bold text-foreground text-primary">{data.costs.tuition}</p>
                    </div>
                    <div className="bg-white rounded-xl p-3 border border-border">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Living Cost</p>
                      <p className="font-bold text-foreground text-primary">{data.costs.living}</p>
                    </div>
                  </div>

                  {/* Scholarships */}
                  <div className="mt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Award className="h-5 w-5 text-primary" />
                      <h4 className="font-bold text-foreground">Scholarships Available</h4>
                    </div>
                    <ul className="space-y-2">
                      {data.scholarships.slice(0, 6).map((sch) => (
                        <li key={sch} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-1">•</span> {sch}
                        </li>
                      ))}
                      {data.scholarships.length > 6 && (
                        <li className="text-sm text-primary font-medium">+ {data.scholarships.length - 6} more...</li>
                      )}
                    </ul>
                  </div>

                  {/* Bursaries */}
                  {data.bursaries && (
                    <div className="mt-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Award className="h-5 w-5 text-primary" />
                        <h4 className="font-bold text-foreground">Bursaries & Discounts</h4>
                      </div>
                      <ul className="space-y-2">
                        {data.bursaries.map((b) => (
                          <li key={b} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-1">•</span> {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="mt-6">
                    <Button className="w-full bg-primary text-white hover:bg-primary/90 font-semibold" asChild>
                      <Link to="/free-consultation">Apply Now — Free Consultation</Link>
                    </Button>
                    <p className="text-xs text-muted-foreground text-center mt-2">No fee. Expert guidance guaranteed.</p>
                  </div>

                  {/* Disclaimer Card */}
                  <div className="mt-6 bg-orange-50/50 border border-orange-100 rounded-xl p-4 dark:bg-orange-950/20 dark:border-orange-900/50">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <Info className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                      </div>
                      <p className="text-xs text-orange-800 dark:text-orange-300 leading-relaxed font-medium">
                        Information may vary over time. Contact our team for the most up-to-date details.
                      </p>
                    </div>
                  </div>
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
