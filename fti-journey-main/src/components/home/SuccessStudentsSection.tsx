import Marquee from 'react-fast-marquee';
import { motion } from 'framer-motion';
import { useCMS } from '@/context/CMSContext';


const SuccessStudentsSection = () => {
    const { cmsData } = useCMS();
    const visaPosters = cmsData.homeSuccessImages;
    return (
        <section className="py-10 bg-[#f5f5f5] relative overflow-hidden">

            {/* Section Header */}
            <div className="container mx-auto px-4 mb-10 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <span className="inline-block py-1 px-4 rounded-full bg-orange-50 text-orange-600 font-semibold text-sm mb-4 border border-orange-100 uppercase tracking-wider">
                        OUR PROUD MOMENTS
                    </span>
                    <h2 className="text-3xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight">
                        Visa Success{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                            Stories
                        </span>
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-base md:text-lg">
                        Real success, real results. Browse through our latest visa approvals and join the league of successful students.
                    </p>
                </motion.div>
            </div>

            {/* Slide Show Container */}
            <div className="relative py-4">
                {/* Gradient Fades for modern look */}
                <div className="absolute left-0 top-0 h-full w-20 md:w-60 bg-gradient-to-r from-[#f5f5f5] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 h-full w-20 md:w-60 bg-gradient-to-l from-[#f5f5f5] to-transparent z-10 pointer-events-none" />

                {/* The 'Marquee' based Slide Show */}
                <Marquee 
                    speed={60} 
                    gradient={false} 
                    pauseOnHover={true} 
                    direction="left"
                    className="py-4"
                >
                    {visaPosters.map((src, i) => (
                        <div key={i} className="mx-4 flex-shrink-0 group">
                            <motion.div 
                                whileHover={{ scale: 1.05 }}
                                className="w-64 md:w-80 rounded-3xl overflow-hidden shadow-xl border-4 border-white hover:border-orange-200 transition-all duration-500 bg-white"
                            >
                                <img
                                    src={src}
                                    alt={`Success Story ${i + 1}`}
                                    className="w-full h-auto object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                                    <p className="text-white font-bold text-lg">Verified Success ✓</p>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </Marquee>
            </div>

        </section>
    );
};

export default SuccessStudentsSection;
