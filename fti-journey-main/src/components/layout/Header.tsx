import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const destinations = [
  { name: 'United Kingdom', path: '/destinations/uk' },
  { name: 'Canada', path: '/destinations/canada' },
  { name: 'Australia', path: '/destinations/australia' },
  { name: 'Ireland', path: '/destinations/ireland' },
  { name: 'USA', path: '/destinations/usa' },
  { name: 'Europe', path: '/destinations/europe' },
];

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Profile', path: '/about' },
  { name: 'Destinations', path: '/destinations' },
  { name: 'Services', path: '/services' },
  { name: 'Events', path: '/events' },
  { name: 'IELTS', path: '/ielts' },
  { name: 'PTE', path: '/pte' },
  { name: 'Contact', path: '/contact' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleWhatsApp = () => {
    window.dispatchEvent(new CustomEvent('open-whatsapp-selector'));
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'py-2 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-xl'
          : 'py-4 bg-transparent'
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <div className="relative transition-transform duration-500 group-hover:scale-105">
                <img
                  src="/fti_logo_transparent.png"
                  alt="FTI Consultants"
                  className="h-16 sm:h-18 md:h-20 w-auto object-contain"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">              {navLinks.map((link) =>
                link.path.startsWith('http') ? (
                  <a
                    key={link.path}
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-3 py-2 rounded-md text-base font-bold transition-colors text-foreground hover:text-primary hover:bg-accent`}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-2 rounded-md text-base font-bold transition-colors ${location.pathname === link.path
                      ? 'text-primary bg-accent'
                      : 'text-foreground hover:text-primary hover:bg-accent'
                      }`}
                  >
                    {link.name}
                  </Link>
                )
              )}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center">
              <Link to="/ielts" className="flex flex-col items-end group transition-transform duration-300 hover:scale-105">
                <span className="text-[#f38d31] font-black text-[24px] md:text-[28px] leading-none tracking-tight">nurturing</span>
                <span className="text-[#98c24b] font-black text-[32px] md:text-[38px] leading-none tracking-tighter -mt-1 md:-mt-1.5">careers</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-accent transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 lg:hidden pt-16 md:pt-20"
          >
            <div className="absolute inset-0 bg-black/20" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative bg-white shadow-card mx-4 mt-2 rounded-xl p-4 max-h-[80vh] overflow-y-auto"
            >
              <div className="space-y-1">
                {navLinks.map((link) =>
                  link.path.startsWith('http') ? (
                    <a
                      key={link.path}
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block px-4 py-3 rounded-lg text-base font-bold transition-colors text-foreground hover:text-primary hover:bg-accent`}
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`block px-4 py-3 rounded-lg text-base font-bold transition-colors ${location.pathname === link.path
                        ? 'text-primary bg-accent'
                        : 'text-foreground hover:text-primary hover:bg-accent'
                        }`}
                    >
                      {link.name}
                    </Link>
                  )
                )}


              </div>

              <div className="mt-4 pt-4 border-t space-y-2">
                <Link to="/ielts" className="flex flex-col items-center group py-6 transition-transform duration-300">
                  <span className="text-[#f38d31] font-black text-[32px] leading-none tracking-tight">nurturing</span>
                  <span className="text-[#98c24b] font-black text-[42px] leading-none tracking-tighter -mt-2">careers</span>
                </Link>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
