import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Youtube, Twitter } from 'lucide-react';
import LottieIcon from '@/components/shared/LottieIcon';

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Events', path: '/events' },
  { name: 'IELTS Preparation', path: '/ielts' },
  { name: 'PTE Preparation', path: '/pte' },
  { name: 'Success Stories', path: '/success' },
  { name: 'Student Portal', path: 'https://fti.20task.com/auth/login' },
];

const destinations = [
  { name: 'United Kingdom', path: '/destinations/uk' },
  { name: 'Canada', path: '/destinations/canada' },
  { name: 'Australia', path: '/destinations/australia' },
  { name: 'Ireland', path: '/destinations/ireland' },
  { name: 'USA', path: '/destinations/usa' },
  { name: 'Europe', path: '/destinations/europe' },
];

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] text-white pt-16 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-30" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 xl:gap-20">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex flex-col mb-6">
              <Link to="/" className="inline-block mb-6 group">
                <div className="bg-white p-3 shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:shadow-primary/20 inline-block border border-white/10 rounded-none">
                  <img
                    src="/fti_logo_transparent.png"
                    alt="FTI Consultants"
                    className="h-14 w-auto object-contain"
                  />
                </div>
              </Link>
              <div className="border-l-4 border-primary pl-5 py-1">
                <p className="text-sm text-white/60 font-medium leading-relaxed italic tracking-wide">
                  "Nurturing Careers with Integrity since 2010"
                </p>
              </div>
            </div>

            <p className="text-white/70 text-sm mb-8 leading-relaxed font-light max-w-sm">
              Your premium partner for overseas education. Expert guidance for UK, Canada, Australia & more with elite IELTS/PTE training and 98% visa success.
            </p>

            <div className="flex gap-3">
              {[Facebook, Instagram, Linkedin, Youtube, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:-translate-y-1 transition-all duration-300 shadow-md">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

          </div>

          {/* Quick Links */}
          <div className="lg:pt-2">
            <h4 className="font-bold text-lg mb-8 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-10 h-1 bg-primary rounded-full" />
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  {link.path.startsWith('http') ? (
                    <a
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-primary text-sm transition-all flex items-center group"
                    >
                      <span className="w-0 group-hover:w-3 h-[2px] bg-primary mr-0 group-hover:mr-3 transition-all duration-300" />
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      className="text-white/60 hover:text-primary text-sm transition-all flex items-center group"
                    >
                      <span className="w-0 group-hover:w-3 h-[2px] bg-primary mr-0 group-hover:mr-3 transition-all duration-300" />
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div className="lg:pt-2">
            <h4 className="font-bold text-lg mb-8 relative inline-block">
              Top Destinations
              <span className="absolute -bottom-2 left-0 w-10 h-1 bg-primary rounded-full" />
            </h4>
            <ul className="space-y-4">
              {destinations.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/60 hover:text-primary text-sm transition-all flex items-center group"
                  >
                    <span className="w-0 group-hover:w-3 h-[2px] bg-primary mr-0 group-hover:mr-3 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Glass Bottom Bar */}
      <div className="border-t border-white/5 bg-white/5 backdrop-blur-md">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/40 text-sm font-medium tracking-wide">
              © {new Date().getFullYear()} FTI Consultants. Engineered for Excellence.
            </p>
            <div className="flex gap-8 text-sm text-white/40">
              <Link to="/privacy" className="hover:text-primary transition-colors hover:underline">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-primary transition-colors hover:underline">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
