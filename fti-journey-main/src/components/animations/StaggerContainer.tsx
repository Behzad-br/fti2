import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';
import { staggerContainer, staggerItem } from '@/lib/motion-variants';

interface StaggerContainerProps {
    children: ReactNode;
    staggerDelay?: number;
    delayChildren?: number;
    once?: boolean;
    threshold?: number;
    className?: string;
    as?: any;
}

/**
 * StaggerContainer Component
 * Container that staggers the animation of its children
 * 
 * Usage:
 * <StaggerContainer staggerDelay={0.1}>
 *   <StaggerItem><Card1 /></StaggerItem>
 *   <StaggerItem><Card2 /></StaggerItem>
 *   <StaggerItem><Card3 /></StaggerItem>
 * </StaggerContainer>
 */
const StaggerContainer = ({
    children,
    staggerDelay = 0.1,
    delayChildren = 0.2,
    once = true,
    threshold = 0.1,
    className = '',
    as: Tag = 'div'
}: StaggerContainerProps) => {
    const { ref, inView } = useInView({
        triggerOnce: once,
        threshold
    });

    const customStaggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
                delayChildren
            }
        }
    };

    const MotionComponent = (motion as any)[Tag] || motion.div;

    return (
        <MotionComponent
            ref={ref}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={customStaggerContainer}
            className={className}
        >
            {children}
        </MotionComponent>
    );
};

/**
 * StaggerItem Component
 * Individual item within StaggerContainer
 * 
 * Usage: See StaggerContainer example above
 */
export const StaggerItem = ({
    children,
    className = ''
}: {
    children: ReactNode;
    className?: string
}) => {
    return (
        <motion.div variants={staggerItem} className={className}>
            {children}
        </motion.div>
    );
};

export default StaggerContainer;
