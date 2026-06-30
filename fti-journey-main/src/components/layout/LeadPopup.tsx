import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

const countries = [
  'United Kingdom',
  'Canada',
  'Australia',
  'Ireland',
  'USA',
  'Germany',
  'Other',
];

const qualifications = [
  'Matriculation / O-Levels',
  'Intermediate / A-Levels',
  "Bachelor's Degree",
  "Master's Degree",
  'Other',
];

const LeadPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    country: '',
    qualification: '',
  });

  useEffect(() => {
    // Check if popup was already shown in this session
    const popupShown = sessionStorage.getItem('leadPopupShown');
    if (popupShown) {
      setHasShown(true);
      return;
    }

    // Show popup after 10 seconds
    const timer = setTimeout(() => {
      if (!hasShown) {
        setIsOpen(true);
        setHasShown(true);
        sessionStorage.setItem('leadPopupShown', 'true');
      }
    }, 10000);

    // Exit intent detection
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
        sessionStorage.setItem('leadPopupShown', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    if (!formData.name || !formData.phone || !formData.country) {
      toast({
        title: 'Please fill all required fields',
        variant: 'destructive',
      });
      return;
    }

    // Submit logic here
    toast({
      title: 'Thank you for your interest!',
      description: 'Our counsellor will contact you within 24 hours.',
    });
    
    setIsOpen(false);
    setFormData({ name: '', phone: '', country: '', qualification: '' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="gradient-primary p-6 text-white text-center relative">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute right-4 top-4 p-1 rounded-full hover:bg-white/20 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
                
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                  <Gift className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-bold mb-1">Get Free Counselling</h2>
                <p className="text-white/80 text-sm">Start your study abroad journey today!</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <Input
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-12"
                  />
                </div>

                <div>
                  <Input
                    placeholder="Phone / WhatsApp *"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="h-12"
                  />
                </div>

                <div>
                  <Select
                    value={formData.country}
                    onValueChange={(value) => setFormData({ ...formData, country: value })}
                  >
                    <SelectTrigger className="h-12 bg-background">
                      <SelectValue placeholder="Interested Country *" />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-[60]">
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Select
                    value={formData.qualification}
                    onValueChange={(value) => setFormData({ ...formData, qualification: value })}
                  >
                    <SelectTrigger className="h-12 bg-background">
                      <SelectValue placeholder="Your Qualification" />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-[60]">
                      {qualifications.map((qual) => (
                        <SelectItem key={qual} value={qual}>
                          {qual}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full">
                  Get Free Counselling
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  By submitting, you agree to our Privacy Policy
                </p>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LeadPopup;
