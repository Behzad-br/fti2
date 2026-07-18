import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

const hasFinePointer = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(any-pointer: fine)').matches;

interface Ripple {
    id: number;
    x: number;
    y: number;
}

const CustomCursor = () => {
    const cursorX = useMotionValue(-200);
    const cursorY = useMotionValue(-200);

    const springConfig = { stiffness: 600, damping: 30, mass: 0.4 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const [isHovering, setIsHovering]       = useState(false);
    const [hasMouse, setHasMouse]           = useState(false);
    const [touchVisible, setTouchVisible]   = useState(false); // finger is on screen
    const [ripples, setRipples]             = useState<Ripple[]>([]);
    const rippleId = useRef(0);

    useEffect(() => {
        setHasMouse(hasFinePointer());

        const mql = window.matchMedia('(any-pointer: fine)');
        const onMqlChange = (e: MediaQueryListEvent) => setHasMouse(e.matches);
        mql.addEventListener('change', onMqlChange);

        // ─── Mouse / trackpad ──────────────────────────────────────────────
        const onMouseMove = (e: PointerEvent) => {
            if (e.pointerType === 'touch') return;
            setTouchVisible(false);
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const onPointerOver = (e: PointerEvent) => {
            if (e.pointerType === 'touch') return;
            const t = e.target as HTMLElement;
            setIsHovering(
                t.tagName?.toLowerCase() === 'a' ||
                t.tagName?.toLowerCase() === 'button' ||
                !!t.closest?.('a') ||
                !!t.closest?.('button') ||
                t.classList?.contains('cursor-pointer') ||
                window.getComputedStyle(t).cursor === 'pointer'
            );
        };

        // ─── Touch: move cursor with finger ───────────────────────────────
        const onTouchStart = (e: TouchEvent) => {
            const t = e.touches[0];
            cursorX.set(t.clientX);
            cursorY.set(t.clientY);
            setTouchVisible(true);

            // Ripple on tap
            const id = ++rippleId.current;
            setRipples(prev => [...prev, { id, x: t.clientX, y: t.clientY }]);
            setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 700);
        };

        const onTouchMove = (e: TouchEvent) => {
            const t = e.touches[0];
            // Move cursor to finger position in real-time
            cursorX.set(t.clientX);
            cursorY.set(t.clientY);
            setTouchVisible(true);
        };

        const onTouchEnd = () => {
            // Hide cursor when finger lifts
            setTimeout(() => setTouchVisible(false), 300);
        };

        window.addEventListener('pointermove',  onMouseMove);
        window.addEventListener('pointerdown',  onMouseMove);
        window.addEventListener('pointerover',  onPointerOver);
        window.addEventListener('touchstart',   onTouchStart, { passive: true });
        window.addEventListener('touchmove',    onTouchMove,  { passive: true });
        window.addEventListener('touchend',     onTouchEnd);
        window.addEventListener('touchcancel',  onTouchEnd);

        return () => {
            window.removeEventListener('pointermove',  onMouseMove);
            window.removeEventListener('pointerdown',  onMouseMove);
            window.removeEventListener('pointerover',  onPointerOver);
            window.removeEventListener('touchstart',   onTouchStart);
            window.removeEventListener('touchmove',    onTouchMove);
            window.removeEventListener('touchend',     onTouchEnd);
            window.removeEventListener('touchcancel',  onTouchEnd);
            mql.removeEventListener('change', onMqlChange);
        };
    }, []);

    // Is the cursor element visible at all?
    const cursorShouldRender = hasMouse || touchVisible;

    return (
        <>
            {/* ── Cursor dot + ring (mouse on desktop, or touch on mobile) ── */}
            {cursorShouldRender && (
                <>
                    {/* Inner dot */}
                    <motion.div
                        className="fixed top-0 left-0 rounded-full pointer-events-none z-[999999]"
                        style={{
                            x: cursorX,
                            y: cursorY,
                            translateX: '-50%',
                            translateY: '-50%',
                            width:  touchVisible ? '10px' : '12px',
                            height: touchVisible ? '10px' : '12px',
                            backgroundColor: '#f97316',
                            boxShadow: touchVisible
                                ? '0 0 0 3px rgba(249,115,22,0.25), 0 0 12px rgba(249,115,22,0.5)'
                                : '0 0 8px rgba(249,115,22,0.4)',
                        }}
                        animate={{
                            scale:   isHovering && !touchVisible ? 0 : 1,
                            opacity: touchVisible ? 1 : (isHovering ? 0 : 1),
                        }}
                        transition={{ duration: 0.12 }}
                    />

                    {/* Outer trailing ring */}
                    <motion.div
                        className="fixed top-0 left-0 rounded-full pointer-events-none z-[999998] border-2 border-orange-400"
                        style={{
                            x: cursorXSpring,
                            y: cursorYSpring,
                            translateX: '-50%',
                            translateY: '-50%',
                            width:  touchVisible ? '42px' : '40px',
                            height: touchVisible ? '42px' : '40px',
                        }}
                        animate={{
                            scale: touchVisible
                                ? 1.1
                                : isHovering ? 1.6 : 1,
                            opacity: touchVisible ? 0.7 : 1,
                            borderColor: isHovering && !touchVisible
                                ? 'rgba(249,115,22,0.9)'
                                : 'rgba(249,115,22,0.45)',
                            backgroundColor: isHovering && !touchVisible
                                ? 'rgba(249,115,22,0.12)'
                                : 'rgba(249,115,22,0.04)',
                        }}
                        transition={{ duration: 0.18 }}
                    />
                </>
            )}

            {/* ── Tap ripple (burst on touch) ── */}
            <AnimatePresence>
                {ripples.map(r => (
                    <motion.div
                        key={r.id}
                        className="fixed pointer-events-none z-[999997]"
                        style={{ left: r.x, top: r.y, translateX: '-50%', translateY: '-50%' }}
                        initial={{ opacity: 0.8, scale: 0.2 }}
                        animate={{ opacity: 0,   scale: 3.2 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                        <div className="w-12 h-12 rounded-full border-2 border-orange-400 bg-orange-400/15" />
                    </motion.div>
                ))}
            </AnimatePresence>
        </>
    );
};

export default CustomCursor;
