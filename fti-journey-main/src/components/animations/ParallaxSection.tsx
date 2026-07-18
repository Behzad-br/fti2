import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactNode, useRef, useEffect, useState } from 'react';

interface ParallaxSectionProps {
    children: ReactNode;
    speed?: number; // 0.5 = slow, 1 = normal, 2 = fast
    direction?: 'up' | 'down';
    className?: string;
    disableOnMobile?: boolean;
}

/**
 * ParallaxSection Component
 * Subtle parallax scroll effect (optimized for performance)
 * 
 * Usage:
 * <ParallaxSection speed={0.5} direction="up">
 *   <YourContent />
 * </ParallaxSection>
 */
const ParallaxSection = ({
    children,
    speed = 0.5,
    direction = 'up',
    className = '',
    disableOnMobile = true
}: ParallaxSectionProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile devices
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start']
    });

    // Calculate parallax movement
    const multiplier = direction === 'up' ? -1 : 1;
    const range = 100 * speed * multiplier;

    const y = useTransform(
        scrollYProgress,
        [0, 1],
        [range, -range]
    );

    // Disable parallax on mobile if specified
    if (disableOnMobile && isMobile) {
        return <div className={className}>{children}</div>;
    }

    return (
        <div ref={ref} className={className}>
            <motion.div
                style={{ y }}
                transition={{ type: 'spring', stiffness: 100, damping: 30 }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default ParallaxSection;
