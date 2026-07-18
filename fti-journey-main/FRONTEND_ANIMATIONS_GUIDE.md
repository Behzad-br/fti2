# Frontend Animations Guide (GSAP + ScrollTrigger)

This project now features premium, high-performance animations powered by **GSAP (GreenSock Animation Platform)** and **ScrollTrigger**. These animations are designed to replicate the premium feel of sites like Inversa.com, with a focus on smooth, GPU-accelerated transitions and staggered reveals.

## Core Animation Utility
The animations are centralized in `src/utils/gsapAnimations.ts`. This utility handles:
- **Hero Section**: Split-text reveals for headlines, staggered fade-ins for buttons and badges.
- **Scroll Reveals**: General section fade-ins with parallax effects.
- **Feature Cards**: Smart left/right staggered reveals based on viewport position.
- **Counters**: Smooth count-up animations for statistics.
- **Card Grids**: Staggered entry for grids of cards (Destinations, Services).
- **Reduced Motion**: Automatically respects user's system preferences for reduced motion.

## Implementation Guide

### 1. Initialization
Animations are initialized globally in the main landing page (`src/pages/Index.tsx`) to ensure they run once the DOM is ready and are cleaned up on unmount.

```tsx
// src/pages/Index.tsx
import { initAllAnimations, cleanupAnimations } from '@/utils/gsapAnimations';

useEffect(() => {
  initAllAnimations();
  return () => cleanupAnimations();
}, []);
```

### 2. CSS Classes for Targeting
To apply animations to new or existing components, simply add the following utility classes. The GSAP engine automatically discovers these classes and applies the appropriate effects.

| Class Name | Effect | Usage |
|------------|--------|-------|
| `.hero-headline` | Split-text stagger reveal (Words slide up) | `<h1 className="hero-headline ...">` |
| `.hero-subheading` | Fade + Slide Up (Delayed) | `<p className="hero-subheading ...">` |
| `.hero-buttons` | Staggered Fade + Slide Up | Wrapper div for CTA buttons |
| `.animate-section` | Smooth Fade + Slide Up on Scroll | Section headers, main containers |
| `.feature-card` | **Smart Stagger**: Left cards slide from left, Right from right. **Hover**: Premium lift + glow. | Service cards, Feature grids |
| `.destination-card` | Staggered Grid Reveal (requires `animateCardGrid` call) | Destination cards |
| `.counter` | Count-up Animation | `<span className="counter" data-target="5000">0</span>` |
| `.bg-pattern` | Parallax Scroll Effect | Background decorative elements |

### 3. Usage Examples

**Hero Section:**
```tsx
<h1 className="hero-headline opacity-0">Your Title</h1>
<p className="hero-subheading opacity-0">Your Subtitle</p>
```

**Feature Grid:**
```tsx
<div className="grid grid-cols-2">
  <div className="feature-card opacity-0">Feature 1</div> {/* Slides from left */}
  <div className="feature-card opacity-0">Feature 2</div> {/* Slides from right */}
</div>
```

**Stats Counter:**
```tsx
<div className="text-4xl">
  <span className="counter" data-target="98">0</span>%
</div>
```

**General Section:**
```tsx
<div className="animate-section opacity-0">
  <h2>Section Title</h2>
  <p>Section content...</p>
</div>
```

## Performance & Accessibility

- **GPU Acceleration**: Animations primarily use `transform` and `opacity` to avoid layout thrashing.
- **Reduced Motion**: The system checks `prefers-reduced-motion` and disables animations automatically for users who request it.
- **Mobile Optimization**: Complex transforms (like parallax) are simplified or disabled on mobile devices to ensure 60fps performance.
- **ScrollTrigger**: Animations are triggered only when elements enter the viewport, saving resources.

## Dependencies
- `gsap`: Core animation engine.
- `gsap/ScrollTrigger`: Scroll interaction plugin.
- **Premium Plugins Replaced**: Custom logic was written to replace `SplitText` (paid plugin) with a lightweight, native implementation to avoid licensing issues while maintaining the same visual effect.
