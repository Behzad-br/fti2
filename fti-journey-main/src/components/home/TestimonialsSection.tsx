import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { gsap } from 'gsap';
import LottieIcon from '@/components/shared/LottieIcon';

const testimonials = [
  {
    id: 1,
    name: 'Ahmed Hassan',
    country: 'United Kingdom',
    university: 'University of Manchester',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    text: 'FTI Consultants made my UK dream come true! Their guidance from application to visa was exceptional. Highly recommended!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Sara Khan',
    country: 'Canada',
    university: 'University of Toronto',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    text: 'The IELTS preparation at FTI helped me score 8.0 bands. The faculty is incredibly supportive and knowledgeable.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Muhammad Ali',
    country: 'Australia',
    university: 'University of Melbourne',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    text: 'Professional service from start to finish. They helped me get a scholarship and my visa was approved within 3 weeks!',
    rating: 5,
  },
  {
    id: 4,
    name: 'Fatima Noor',
    country: 'Ireland',
    university: 'Trinity College Dublin',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    text: 'I was confused about my options, but FTI counsellors helped me find the perfect program. Now studying in Dublin!',
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused]);

  // Animate on index change
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current,
        { opacity: 0, scale: 0.95, y: 10 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.7)' }
      );
    }
  }, [currentIndex]);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="animate-section text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-semibold text-sm uppercase tracking-wider mb-4 border border-primary/20">
            Success Stories
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
            What Our Students Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Join thousands of successful students who trusted us with their study abroad journey.
          </p>
        </div>

        {/* Carousel */}
        <div className="animate-section relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="overflow-hidden rounded-[3rem] bg-white border border-border/50 shadow-2xl p-8 md:p-16 relative">
            {/* Quote Lottie Icon */}
            <div className="absolute top-8 left-8 opacity-20">
              <LottieIcon url="https://lottie.host/4a5f6e8c-8f2c-4b5b-9d1a-5f6e8c7b8d9a/uR79WkH6fF.json" className="w-20 h-20" />
            </div>

            <div ref={contentRef} className="text-center relative z-10">
              <p className="text-xl md:text-3xl font-medium text-foreground mb-12 italic leading-relaxed max-w-3xl mx-auto">
                "{testimonials[currentIndex].text}"
              </p>

              <div className="flex flex-col items-center justify-center gap-6">
                <div className="relative">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-2xl"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-lg border-2 border-white">
                    {testimonials[currentIndex].country === 'United Kingdom' ? '🇬🇧' :
                      testimonials[currentIndex].country === 'Canada' ? '🇨🇦' :
                        testimonials[currentIndex].country === 'Australia' ? '🇦🇺' : '🇮🇪'}
                  </div>
                </div>

                <div>
                  <h4 className="text-2xl font-bold text-foreground">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-primary font-semibold mt-1">
                    {testimonials[currentIndex].university}
                  </p>
                  <div className="flex items-center justify-center gap-1 mt-3">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <button
            onClick={prev}
            className="absolute left-4 md:-left-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white shadow-2xl flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 z-10 group"
          >
            <ChevronLeft className="h-6 w-6 text-foreground group-hover:text-white" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 md:-right-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white shadow-2xl flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 z-10 group"
          >
            <ChevronRight className="h-6 w-6 text-foreground group-hover:text-white" />
          </button>

          {/* Inline Dots */}
          <div className="flex justify-center gap-3 mt-10">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-500 rounded-full ${index === currentIndex
                  ? 'w-12 h-3 bg-primary'
                  : 'w-3 h-3 bg-primary/20 hover:bg-primary/40'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
