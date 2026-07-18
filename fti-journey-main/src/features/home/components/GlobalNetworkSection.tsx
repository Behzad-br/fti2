import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

const GlobalNetworkSection = () => {
    const isMobile = useIsMobile();
    // Array of universities to orbit in 3D
    const universities = [
        { name: 'Oxford', url: 'https://www.google.com/s2/favicons?sz=128&domain=ox.ac.uk', orbit: 240, duration: 20, delay: 0 },
        { name: 'Harvard', url: 'https://www.google.com/s2/favicons?sz=128&domain=harvard.edu', orbit: 280, duration: 25, delay: -5 },
        { name: 'Toronto', url: 'https://www.google.com/s2/favicons?sz=128&domain=utoronto.ca', orbit: 320, duration: 30, delay: -10 },
        { name: 'Melbourne', url: 'https://www.google.com/s2/favicons?sz=128&domain=unimelb.edu.au', orbit: 260, duration: 22, delay: -15 },
        { name: 'NUS', url: 'https://www.google.com/s2/favicons?sz=128&domain=nus.edu.sg', orbit: 300, duration: 28, delay: -8 },
    ];

    return (
        <section className="py-24 bg-[#f4f4f5] relative overflow-hidden flex flex-col items-center justify-center min-h-screen">
            <div className="container mx-auto px-4 text-center z-20 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-semibold text-sm uppercase tracking-wider mb-4 border border-primary/20">
                        Global Network
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                        Study Across The Globe
                    </h2>
                </motion.div>

                {/* 3D Animation Container */}
                <div 
                    className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px] mx-auto flex items-center justify-center"
                    style={{ perspective: "1000px" }}
                >
                    {/* Central Globe (Solid to hide items behind) */}
                    <div 
                        className="absolute w-[200px] h-[200px] md:w-[280px] md:h-[280px] bg-[#f4f4f5] rounded-full shadow-[inset_0_-10px_20px_rgba(0,0,0,0.05)]"
                        style={{ transform: "translateZ(0px)" }}
                    />
                    
                    {/* Central Wireframe Globe */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[200px] h-[200px] md:w-[280px] md:h-[280px] flex items-center justify-center z-0 opacity-20"
                        style={{ transform: "translateZ(1px)" }}
                    >
                        {/* Wireframe SVG Globe */}
                        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5" className="w-[100%] h-[100%] text-slate-800">
                            <circle cx="50" cy="50" r="48" />
                            <ellipse cx="50" cy="50" rx="20" ry="48" />
                            <ellipse cx="50" cy="50" rx="35" ry="48" />
                            <ellipse cx="50" cy="50" rx="5" ry="48" />
                            {/* Horizontal Lines */}
                            <path d="M 2 50 L 98 50" />
                            <path d="M 8 30 Q 50 40 92 30" />
                            <path d="M 8 70 Q 50 60 92 70" />
                            <path d="M 18 18 Q 50 30 82 18" />
                            <path d="M 18 82 Q 50 70 82 82" />
                        </svg>
                    </motion.div>

                    {/* Glowing highlight in center */}
                    <div className="absolute w-[2px] h-[400px] bg-orange-400/20 blur-[2px] rounded-full rotate-[15deg] z-0" style={{ transform: "translateZ(2px)" }} />

                    {/* Orbiting Elements in 3D */}
                    <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none" style={{ transformStyle: "preserve-3d" }}>
                        {universities.map((uni, index) => {
                            return (
                                <motion.div
                                    key={index}
                                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                    style={{ transformStyle: "preserve-3d" }}
                                    initial={{ rotateY: 0 }}
                                    animate={{ rotateY: 360 }}
                                    transition={{
                                        duration: uni.duration,
                                        repeat: Infinity,
                                        ease: "linear",
                                        delay: uni.delay // Will jump the items to different starting positions immediately
                                    }}
                                >
                                    {/* Offset from center */}
                                    <div 
                                      className="absolute pointer-events-none"
                                      style={{ 
                                          transform: `translateX(${ isMobile ? uni.orbit * 0.5 : uni.orbit }px)`,
                                          transformStyle: "preserve-3d"
                                      }}
                                    >
                                        {/* Card content - counter rotate to face camera */}
                                        <motion.div
                                            className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-xl shadow-xl flex items-center justify-center p-2 border border-gray-100 pointer-events-auto hover:scale-110 cursor-pointer overflow-hidden backdrop-blur-sm"
                                            initial={{ rotateY: 0 }}
                                            animate={{ rotateY: -360 }}
                                            transition={{
                                                duration: uni.duration,
                                                repeat: Infinity,
                                                ease: "linear",
                                                delay: uni.delay
                                            }}
                                            title={uni.name}
                                        >
                                           <img src={uni.url} alt={uni.name} className="w-full h-full object-contain" />
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GlobalNetworkSection;
