import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Check if user prefers reduced motion
 */
const prefersReducedMotion = (): boolean => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Check if device is mobile
 */
const isMobile = (): boolean => {
    return window.innerWidth < 768;
};

/**
 * Initialize GSAP with global settings
 */
/**
 * Initialize GSAP with global settings
 */
export const initGSAP = () => {
    // Force immediate display of all elements to fix the 'blank' screen issue
    // as requested by the user
    gsap.globalTimeline.timeScale(100); // Make animations virtually instant

    // Set global defaults to prevent hiding elements
    gsap.defaults({
        opacity: 1,
        duration: 0.01,
        ease: 'none',
    });

    // Ensure ScrollTrigger is active but doesn't hide things
    gsap.config({
        force3D: true,
        nullTargetWarn: false,
    });
};

/**
 * Custom text splitting utility (free alternative to SplitText)
 */
const splitTextIntoWords = (element: HTMLElement): HTMLElement[] => {
    const text = element.textContent || '';
    const words = text.split(' ');
    element.innerHTML = '';

    const wordElements: HTMLElement[] = [];
    words.forEach((word, index) => {
        const span = document.createElement('span');
        span.style.display = 'inline-block';
        span.style.overflow = 'hidden';
        span.style.verticalAlign = 'top';

        const innerSpan = document.createElement('span');
        innerSpan.textContent = word;
        innerSpan.style.display = 'inline-block';
        innerSpan.classList.add('word-inner');

        span.appendChild(innerSpan);
        element.appendChild(span);

        if (index < words.length - 1) {
            element.appendChild(document.createTextNode(' '));
        }

        wordElements.push(innerSpan);
    });

    return wordElements;
};

/**
 * Hero Section Animations
 * - Split text reveal for headline
 * - Fade + slide for subheading and buttons
 * - Masked reveal for hero image
 */
export const animateHeroSection = () => {
    if (prefersReducedMotion()) {
        gsap.set('.hero-headline, .hero-subheading, .hero-buttons, .hero-badges, .hero-image', { opacity: 1 });
        return;
    }

    const tl = gsap.timeline({ delay: 0.1 });

    tl.fromTo('.hero-headline',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' }
    );

    tl.fromTo('.hero-subheading',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' },
        '-=0.5'
    );

    tl.fromTo('.hero-buttons',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' },
        '-=0.4'
    );

    tl.fromTo('.hero-badges',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' },
        '-=0.4'
    );
};

/**
 * Feature/Benefit Cards Animations
 * - Stagger reveal based on position (left/right)
 * - Premium hover effects
 */
/**
 * Feature/Benefit Cards Animations
 * - Stagger reveal based on position (left/right)
 * - Premium hover effects
 */
export const animateFeatureCards = () => {
    const cards = gsap.utils.toArray<HTMLElement>('.feature-card');

    if (prefersReducedMotion()) {
        gsap.set(cards, { opacity: 1 });
        return;
    }

    cards.forEach((card, index) => {
        const isEven = index % 2 === 0;
        const xStart = isEven ? -80 : 80;

        gsap.fromTo(card,
            { opacity: 0, x: isMobile() ? 0 : xStart, y: 12 },
            {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                    once: true,
                },
                opacity: 1,
                x: 0,
                y: 0,
                duration: 0.5, // Faster card reveal
                ease: 'expo.out',
                delay: index * 0.1, // Faster stagger
            }
        );

        // Premium hover effect
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                duration: 0.2, // Snappier hover
                ease: 'power2.out',
            });

            const icon = card.querySelector('.feature-icon');
            if (icon) {
                gsap.to(icon, {
                    rotate: 6,
                    scale: 1.03,
                    duration: 0.2,
                    ease: 'back.out(1.7)',
                });
            }
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                duration: 0.2,
                ease: 'power2.out',
            });

            const icon = card.querySelector('.feature-icon');
            if (icon) {
                gsap.to(icon, {
                    rotate: 0,
                    scale: 1,
                    duration: 0.2,
                    ease: 'power2.out',
                });
            }
        });
    });
};

/**
 * Stats/Counter Animation
 * - Count-up animation on first view
 */
/**
 * Stats/Counter Animation
 * - Count-up animation on first view
 */
export const animateCounters = () => {
    const counters = gsap.utils.toArray<HTMLElement>('.counter');

    counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-target') || '0');
        const obj = { value: 0 };

        ScrollTrigger.create({
            trigger: counter,
            start: 'top 80%',
            once: true,
            onEnter: () => {
                if (prefersReducedMotion()) {
                    counter.textContent = target.toLocaleString();
                    return;
                }

                gsap.to(obj, {
                    value: target,
                    duration: 0.8, // Faster counting
                    ease: 'power2.out',
                    onUpdate: () => {
                        counter.textContent = Math.ceil(obj.value).toLocaleString();
                    },
                });
            },
        });
    });
};

/**
 * Section Transitions
 * - Subtle fade + y reveal
 * - Parallax background (if present)
 */
export const animateSections = () => {
    const sections = gsap.utils.toArray<HTMLElement>('.animate-section');

    if (prefersReducedMotion()) {
        gsap.set(sections, { opacity: 1 });
        return;
    }

    sections.forEach((section) => {
        gsap.fromTo(section,
            { opacity: 0, y: 30 },
            {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                    once: true,
                },
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: 'power2.out',
                clearProps: 'all', // Ensure no leftover styles after animation
            }
        );
    });
};

/**
 * Card Grid Stagger Animation
 * - For service cards, destination cards, etc.
 */
export const animateCardGrid = (selector: string, stagger = 0.08) => { // Faster default stagger
    const cards = gsap.utils.toArray<HTMLElement>(selector);
    if (cards.length === 0) return;

    if (prefersReducedMotion()) {
        gsap.set(cards, { opacity: 1 });
        return;
    }

    gsap.fromTo(cards,
        { opacity: 0, y: 30, scale: 0.95 },
        {
            scrollTrigger: {
                trigger: cards[0],
                start: 'top 80%',
                toggleActions: 'play none none none',
                once: true,
            },
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5, // Faster grid reveal
            ease: 'expo.out',
            stagger: stagger,
        }
    );
};

/**
 * Initialize all animations
 */
export const initAllAnimations = () => {
    initGSAP();

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            runAnimations();
        });
    } else {
        runAnimations();
    }
};

const runAnimations = () => {
    animateHeroSection();
    animateFeatureCards();
    animateCounters();
    animateSections();

    // Refresh ScrollTrigger after all animations are set
    ScrollTrigger.refresh();
};

/**
 * Cleanup function
 */
export const cleanupAnimations = () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    gsap.globalTimeline.clear();
};
