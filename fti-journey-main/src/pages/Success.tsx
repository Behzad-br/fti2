import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import Marquee from 'react-fast-marquee';

const visaPosters = [
    '/visa-posts/student1.png',
    '/visa-posts/student2.png',
    '/visa-posts/student3.png',
    '/visa-posts/student4.png',
    '/visa-posts/student5.png',
];

const Success = () => {
  return (
    <Layout>
      <div className="page-transition bg-[#0c0805] min-h-screen">
        {/* Cinematic Header */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(circle_at_50%_0%,rgba(249,115,22,0.15),transparent_70%)]" />
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-black text-xs uppercase tracking-[0.4em] mb-8">
                The Wall of Victory
              </span>
              <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
                Our Visa <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300 italic">Success Stories</span>
              </h1>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
                Celebrating the dreams of our students who are now studying at top universities worldwide.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Floating Poster Grid */}
        <section className="pb-32 relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
              {visaPosters.map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  whileHover={{ y: -20, scale: 1.05 }}
                  className="group relative"
                >
                  {/* Premium Frame Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-br from-primary to-amber-500 rounded-[2.5rem] opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-700" />
                  
                  <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-slate-900 group-hover:border-primary/50 transition-all duration-700">
                    <img
                      src={src}
                      alt={`Success Story ${i + 1}`}
                      className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-1000"
                    />
                    
                    {/* Glass Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-500 flex items-end p-8">
                      <div className="text-white">
                        <p className="font-black text-xs uppercase tracking-[0.3em] text-primary mb-2">Verified Success</p>
                        <h3 className="text-2xl font-black tracking-tight">Student Success #{i + 1}</h3>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Continuous Marquee Background Decoration */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden opacity-5 pointer-events-none pb-20">
          <Marquee speed={30} gradient={false}>
            <div className="flex gap-20 py-10">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-[15rem] font-black text-white italic tracking-tighter uppercase whitespace-nowrap">
                  FTI JOURNEY SUCCESS • FTI JOURNEY SUCCESS •
                </span>
              ))}
            </div>
          </Marquee>
        </div>
      </div>
    </Layout>
  );
};

export default Success;
