import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Ad = {
    id: number;
    title: string;
    image: string;
    link: string;
    active: boolean;
    type: 'IELTS' | 'PTE' | 'General';
};

interface PromoBoardProps {
    category: 'IELTS' | 'PTE' | 'General';
}

const PromoBoard = ({ category }: PromoBoardProps) => {
    const [ads, setAds] = useState<Ad[]>([]);

    useEffect(() => {
        const loadAds = () => {
            const savedAds = localStorage.getItem('fti_ads_v2');
            let parsedAds: Ad[] = [];

            if (savedAds) {
                parsedAds = JSON.parse(savedAds);
            } else {
                parsedAds = [
                    {
                        id: 1,
                        title: 'IELTS Intensive Crash Course',
                        image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=2070&auto=format&fit=crop',
                        link: '/ielts',
                        active: true,
                        type: 'IELTS'
                    },
                    {
                        id: 2,
                        title: 'Study in Australia - 2026',
                        image: 'https://images.unsplash.com/photo-1523482580638-0167791260f4?q=80&w=2070&auto=format&fit=crop',
                        link: '/destinations/australia',
                        active: true,
                        type: 'General'
                    },
                    {
                        id: 3,
                        title: 'PTE Special Discount 50%',
                        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop',
                        link: '/pte',
                        active: true,
                        type: 'PTE'
                    },
                    {
                        id: 4,
                        title: 'Canada Visa Seminar',
                        image: 'https://images.unsplash.com/photo-1533036662701-443b74e6284f?q=80&w=2070&auto=format&fit=crop',
                        link: '/destinations/canada',
                        active: true,
                        type: 'General'
                    }
                ];
                localStorage.setItem('fti_ads_v2', JSON.stringify(parsedAds));
            }

            const relevantAds = parsedAds.filter(
                ad => ad.active && (ad.type === category || ad.type === 'General')
            );
            setAds(relevantAds);
        };

        loadAds();
        const interval = setInterval(loadAds, 2000);
        return () => clearInterval(interval);
    }, [category]);

    if (ads.length === 0) return null;

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {ads.map((ad, index) => (
                    <motion.div
                        key={ad.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.15 }}
                        whileHover={{ y: -10, scale: 1.02 }}
                        className="relative group overflow-hidden rounded-[2.5rem] shadow-2xl cursor-pointer bg-white border border-slate-100"
                        onClick={() => {
                            if (ad.link) window.location.href = ad.link;
                        }}
                    >
                        {/* Animated Gradient Border */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent z-10 opacity-70 group-hover:opacity-60 transition-opacity duration-500" />

                        <div className="aspect-[16/10] overflow-hidden">
                            <motion.img
                                src={ad.image}
                                alt={ad.title}
                                className="w-full h-full object-cover"
                                whileHover={{ scale: 1.15 }}
                                transition={{ duration: 1.2 }}
                            />
                        </div>

                        {/* Glassmorphic Content Overlap */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.2 + (index * 0.1) }}
                            >
                                <span className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 shadow-lg backdrop-blur-md ${ad.type === 'IELTS' ? 'bg-primary/90 text-white' :
                                    ad.type === 'PTE' ? 'bg-blue-600/90 text-white' :
                                        'bg-slate-800/90 text-white'
                                    }`}>
                                    {ad.type} EXCLUSIVE
                                </span>
                                <h3 className="text-2xl font-black text-white mb-3 leading-tight tracking-tight group-hover:text-primary transition-colors duration-300">
                                    {ad.title}
                                </h3>
                                <div className="flex items-center gap-2 text-white/70 group-hover:text-white transition-colors">
                                    <span className="text-xs font-black uppercase tracking-widest">Enrol Now</span>
                                    <div className="w-8 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                                </div>
                            </motion.div>
                        </div>
                        
                        {/* Interactive Shine Effect */}
                        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 z-10" />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default PromoBoard;
