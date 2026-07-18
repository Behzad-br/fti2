/**
 * Reusable Framer Motion Variants
 * MetaMask-style smooth animations
 */

export const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
    }
};

export const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
    }
};

export const fadeInDown = {
    hidden: { opacity: 0, y: -30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
    }
};

export const fadeInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
    }
};

export const fadeInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
    }
};

export const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }
    }
};

export const slideInUp = {
    hidden: { y: '100%', opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
};

export const slideInDown = {
    hidden: { y: '-100%', opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
};

// Page transition variants
export const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: { duration: 0.3, ease: [0.7, 0, 0.84, 0] }
    }
};

// Stagger container variants
export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

export const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }
    }
};

// Card hover variants
export const cardHover = {
    rest: {
        scale: 1,
        y: 0,
        boxShadow: '0 4px 20px -4px rgba(0, 0, 0, 0.08)'
    },
    hover: {
        scale: 1.02,
        y: -8,
        boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.15)',
        transition: { duration: 0.3, ease: 'easeOut' }
    }
};

// Button hover variants
export const buttonHover = {
    rest: { scale: 1 },
    hover: {
        scale: 1.03,
        transition: { duration: 0.2, ease: 'easeInOut' }
    },
    tap: { scale: 0.98 }
};

// Icon wiggle animation
export const iconWiggle = {
    rest: { rotate: 0 },
    hover: {
        rotate: [0, -10, 10, -10, 0],
        transition: { duration: 0.5 }
    }
};

// Glow effect
export const glowEffect = {
    rest: {
        boxShadow: '0 0 0 0 rgba(255, 107, 53, 0)'
    },
    hover: {
        boxShadow: '0 0 20px 5px rgba(255, 107, 53, 0.3)',
        transition: { duration: 0.3 }
    }
};

// Accordion variants
export const accordionVariants = {
    collapsed: { height: 0, opacity: 0 },
    expanded: {
        height: 'auto',
        opacity: 1,
        transition: {
            height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 0.25, delay: 0.05 }
        }
    }
};

// Modal variants
export const modalBackdrop = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.2 }
    }
};

export const modalContent = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
    }
};

// Navbar variants
export const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
    }
};

// Mobile menu variants
export const mobileMenuVariants = {
    closed: { x: '100%', opacity: 0 },
    open: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
    }
};

export const mobileMenuItemVariants = {
    closed: { x: 20, opacity: 0 },
    open: (i: number) => ({
        x: 0,
        opacity: 1,
        transition: { delay: i * 0.05, duration: 0.3 }
    })
};
