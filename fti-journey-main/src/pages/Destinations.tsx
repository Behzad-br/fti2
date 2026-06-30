import { motion } from 'framer-motion';
import { ArrowRight, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import useScrollReveal from '@/hooks/useScrollReveal';
import { useCMS } from '@/context/CMSContext';

const destinations = [
  {
    name: 'United Kingdom',
    flag: '🇬🇧',
    path: '/destinations/uk',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=400&fit=crop',
    description: 'World-renowned universities, rich culture, and excellent post-study work opportunities.',
    highlights: ['2-year PSW visa', 'Russell Group universities', 'September & January intakes'],
  },
  {
    name: 'Canada',
    flag: '🇨🇦',
    path: '/destinations/canada',
    image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=600&h=400&fit=crop',
    description: 'Affordable education, pathway to PR, and welcoming multicultural environment.',
    highlights: ['3-year PGWP', 'Co-op programs', 'PR pathway'],
  },
  {
    name: 'Australia',
    flag: '🇦🇺',
    path: '/destinations/australia',
    image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=600&h=400&fit=crop',
    description: 'High quality of life, work while studying, and excellent research opportunities.',
    highlights: ['Work 48hrs/fortnight', 'Post-study work visa', 'February & July intakes'],
  },
  {
    name: 'Ireland',
    flag: '🇮🇪',
    path: '/destinations/ireland',
    image: 'https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?w=600&h=400&fit=crop',
    description: 'Tech hub of Europe, excellent stay-back options, and English-speaking environment.',
    highlights: ['2-year stay back', 'Tech companies HQ', 'No tuition for EU'],
  },
  {
    name: 'USA',
    flag: '🇺🇸',
    path: '/destinations/usa',
    image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=600&h=400&fit=crop',
    description: 'World\'s best universities, diverse programs, and OPT work opportunities.',
    highlights: ['OPT program', 'Ivy League options', 'Fall & Spring intakes'],
  },
  {
    name: 'Europe',
    flag: '🇪🇺',
    path: '/destinations/europe',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&h=400&fit=crop',
    description: 'Low or no tuition fees, diverse cultures, and Schengen travel access.',
    highlights: ['Low tuition', 'English programs', 'Schengen access'],
  },
];

const Destinations = () => {
  const { ref, isVisible } = useScrollReveal(0.1);
  const { cmsData } = useCMS();

  return (
    <Layout>
      <div className="page-transition">
        {/* Hero */}
        <section className="gradient-hero py-20 md:py-32">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
                Study Destinations
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                {cmsData.destinationsHeroTitle}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {cmsData.destinationsHeroDescription}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Destinations Grid */}
        <section className="py-20 bg-white" ref={ref}>
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {destinations.map((dest, index) => (
                <motion.div
                  key={dest.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link
                    to={dest.path}
                    className="group block bg-white rounded-2xl shadow-card overflow-hidden card-hover"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={dest.image}
                        alt={dest.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-4 left-4 flex items-center gap-2">
                        <span className="text-3xl">{dest.flag}</span>
                        <h3 className="text-xl font-bold text-white">{dest.name}</h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {dest.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {dest.highlights.map((highlight, i) => (
                          <span
                            key={i}
                            className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center text-primary font-medium text-sm">
                        View requirements
                        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Destinations;
