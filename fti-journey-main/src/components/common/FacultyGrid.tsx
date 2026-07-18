import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/animations/AnimatedSection';
import StaggerContainer from '@/components/animations/StaggerContainer';

interface TeamMember {
    id: string;
    name: string;
    role: string;
    image: string;
    category: 'General' | 'IELTS' | 'PTE';
}

const defaultTeam: TeamMember[] = [
    {
        id: '1',
        name: 'Zahoor Elahi',
        role: 'Founder & CEO',
        image: '/ceo.jpg',
        category: 'General'
    },
    {
        id: '2',
        name: 'Sarah Khan',
        role: 'Head of Admissions',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face',
        category: 'General'
    },
    {
        id: '3',
        name: 'Ali Hassan',
        role: 'IELTS Expert Trainer',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
        category: 'IELTS'
    },
    {
        id: '4',
        name: 'Fatima Noor',
        role: 'PTE Specialist',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face',
        category: 'PTE'
    },
    {
        id: '5',
        name: 'Hassan Ali',
        role: 'Senior PTE Instructor',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=face',
        category: 'PTE'
    },
    {
        id: '6',
        name: 'Aisha Tariq',
        role: 'PTE Academic Coach',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face',
        category: 'PTE'
    },
];

interface FacultyGridProps {
    category: 'General' | 'IELTS' | 'PTE';
    title?: string;
    subtitle?: string;
}

const FacultyGrid = ({ category, title, subtitle }: FacultyGridProps) => {
    const [faculty, setFaculty] = useState<TeamMember[]>([]);

    useEffect(() => {
        // Load data
        const savedTeam = localStorage.getItem('fti_team');
        let allMembers: TeamMember[] = [];

        if (savedTeam) {
            allMembers = JSON.parse(savedTeam);
        } else {
            allMembers = defaultTeam;
        }

        const filtered = allMembers.filter(m => m.category === category);
        setFaculty(filtered);
    }, [category]);

    if (faculty.length === 0) return null;

    return (
        <div className="py-16">
            <AnimatedSection className="text-center mb-16">
                {title && (
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                        {title}
                    </h2>
                )}
                {subtitle && (
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium">
                        {subtitle}
                    </p>
                )}
            </AnimatedSection>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {faculty.map((member) => (
                    <motion.div 
                        key={member.id} 
                        className="group relative overflow-hidden rounded-[2.5rem] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-100 transition-all hover:shadow-[0_20px_60px_rgba(255,165,0,0.15)] hover:border-orange-200"
                        whileHover={{ y: -15 }}
                    >
                        {/* Image Container with Hover Zoom */}
                        <div className="aspect-[4/5] overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-60 z-10 group-hover:opacity-80 transition-opacity duration-500" />
                            <motion.img
                                src={member.image}
                                alt={member.name}
                                className="h-full w-full object-cover"
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.8 }}
                            />
                            {/* Content Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-8 z-20 transform transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    className="space-y-3"
                                >
                                    <h3 className="text-2xl font-black text-white leading-tight">
                                        {member.name}
                                    </h3>
                                    <div className="inline-block bg-primary/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
                                        <p className="text-white text-xs font-black uppercase tracking-[0.1em]">
                                            {member.role}
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </StaggerContainer>
        </div>
    );
};

export default FacultyGrid;
