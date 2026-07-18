import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cardHover, iconWiggle } from '@/lib/motion-variants';

interface AnimatedCardProps {
    children: ReactNode;
    className?: string;
    hoverLift?: boolean;
    hoverGlow?: boolean;
    iconWiggleEffect?: boolean;
    onClick?: () => void;
}

/**
 * AnimatedCard Component
 * Card with premium hover effects (lift, glow, icon wiggle)
 * 
 * Usage:
 * <AnimatedCard hoverLift hoverGlow>
 *   <YourCardContent />
 * </AnimatedCard>
 */
const AnimatedCard = ({
    children,
    className = '',
    hoverLift = true,
    hoverGlow = false,
    iconWiggleEffect = false,
    onClick
}: AnimatedCardProps) => {
    const hoverEffects = hoverLift ? cardHover : {};

    const glowStyle = hoverGlow
        ? {
            boxShadow: {
                rest: '0 4px 20px -4px rgba(0, 0, 0, 0.08)',
                hover: '0 20px 40px -12px rgba(255, 107, 53, 0.25)'
            }
        }
        : {};

    return (
        <motion.div
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            variants={hoverLift ? cardHover : undefined}
            className={`${className} ${onClick ? 'cursor-pointer' : ''}`}
            onClick={onClick}
            style={{
                transformOrigin: 'center'
            }}
        >
            {children}
        </motion.div>
    );
};

/**
 * AnimatedIcon Component
 * Icon with wiggle effect on hover
 * 
 * Usage:
 * <AnimatedIcon>
 *   <YourIcon />
 * </AnimatedIcon>
 */
export const AnimatedIcon = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
    return (
        <motion.div
            variants={iconWiggle}
            className={className}
            style={{ display: 'inline-block' }}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedCard;
