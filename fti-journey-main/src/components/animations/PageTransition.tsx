import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
import { pageTransition } from '@/lib/motion-variants';

interface PageTransitionProps {
    children: ReactNode;
}

/**
 * PageTransition Component
 * Wraps page content to provide smooth route transitions
 * 
 * Usage:
 * <PageTransition>
 *   <YourPageContent />
 * </PageTransition>
 */
const PageTransition = ({ children }: PageTransitionProps) => {
    // Returning children directly to disable page transitions
    // that were causing blank screen issues
    return (
        <div className="w-full h-full">
            {children}
        </div>
    );
};

export default PageTransition;
