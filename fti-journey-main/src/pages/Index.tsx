import { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import DestinationsSection from '@/components/home/DestinationsSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import PartnersSection from '@/components/home/PartnersSection';
import TestPrepSection from '@/components/home/TestPrepSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import SuccessStudentsSection from '@/components/home/SuccessStudentsSection';
import OfficesSection from '@/components/home/OfficesSection';
import CTASection from '@/components/home/CTASection';
import { initAllAnimations, cleanupAnimations, animateCardGrid } from '@/utils/gsapAnimations';

const Index = () => {
  useEffect(() => {
    // Initialize premium animations
    initAllAnimations();

    // Explicitly animate destination cards as a staggered grid
    // Logic: wait a bit for layout
    const timer = setTimeout(() => {
      animateCardGrid('.destination-card', 0.1);
    }, 100);

    return () => {
      clearTimeout(timer);
      cleanupAnimations();
    };
  }, []);

  return (
    <Layout>
      <div className="page-transition">
        <HeroSection />
        <PartnersSection />
        <ServicesSection />
        <DestinationsSection />
        <WhyChooseUs />
        <SuccessStudentsSection />
        <TestPrepSection />
        <CTASection />
      </div>
    </Layout>
  );
};

export default Index;
