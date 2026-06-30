import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';
import {
    fadeInUp,
    fadeInDown,
    fadeInLeft,
    fadeInRight,
    fadeIn,
    scaleIn
} from '@/lib/motion-variants';

interface AnimatedSectionProps {
    children: ReactNode;
    direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';
    delay?: number;
    duration?: number;
    once?: boolean;
    threshold?: number;
    className?: string;
}

/**
 * AnimatedSection Component
 * Reusable scroll-triggered animation wrapper
 * 
 * Usage:
 * <AnimatedSection direction="up" delay={0.2}>
 *   <YourContent />
 * </AnimatedSection>
 */
const AnimatedSection = ({
    children,
    direction = 'up',
    delay = 0,
    duration = 0.6,
    once = true,
    threshold = 0.1,
    className = ''
}: AnimatedSectionProps) => {
    // Return children directly to effectively 'remove' the animation 
    // as requested by the user to fix the 'blank' issue
    return (
        <div className={className}>
            {children}
        </div>
    );
};

export default AnimatedSection;
