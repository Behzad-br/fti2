import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import LottieIcon from '@/components/shared/LottieIcon';

const offices = [
  {
    city: 'Gujranwala',
    country: 'Pakistan',
    flag: '🇵🇰',
    address: 'Main GT Road, Near XYZ Plaza, Gujranwala',
    phone: '+92 300 1234567',
    email: 'info@fticonsultants.com',
    hours: 'Mon-Sat: 9:00 AM - 6:00 PM',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108784.15695556!2d74.12652!3d32.15!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391f2d8c1d5d9e2d%3A0x8e2a8e8e8e8e8e8e!2sGujranwala%2C%20Pakistan!5e0!3m2!1sen!2s!4v1234567890',
  },
  {
    city: 'London',
    country: 'United Kingdom',
    flag: '🇬🇧',
    address: '123 Business Street, London, UK',
    phone: '+44 20 1234 5678',
    email: 'uk@fticonsultants.com',
    hours: 'Mon-Fri: 9:00 AM - 5:00 PM',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158857.72820185635!2d-0.24168!3d51.5287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2s!4v1234567890',
  },
];

const OfficesSection = () => {
  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="animate-section text-center mb-20">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-semibold text-sm uppercase tracking-wider mb-4 border border-primary/20">
            Global Presence
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
            Visit Our Global Offices
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            With offices in Pakistan and the UK, we're always close to support your international education journey.
          </p>
        </div>

        {/* Office Cards */}
        <div className="grid md:grid-cols-2 gap-10">
          {offices.map((office, index) => (
            <div
              key={office.city}
              className="feature-card bg-white rounded-[2.5rem] shadow-xl overflow-hidden h-full group hover:shadow-2xl transition-all duration-500 border border-border/50"
            >
              {/* Map Container */}
              <div className="h-64 bg-slate-100 relative overflow-hidden">
                <iframe
                  src={office.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${office.city} Office Map`}
                  className="grayscale contrast-125 opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-in-out border-b border-border"
                />
                <div className="absolute inset-x-0 bottom-0 h-1bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 md:p-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-4xl shadow-soft">
                      {office.flag}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">{office.city} Office</h3>
                      <p className="text-primary font-semibold text-sm uppercase tracking-widest">{office.country}</p>
                    </div>
                  </div>
                  <div className="hidden sm:block">
                    <LottieIcon url="https://lottie.host/e8a1f7d4-9c2b-4d5e-8f1a-b2c3d4e5f6a7/vI6Y7x8Z9w.json" className="w-16 h-16" />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 group-hover:bg-white group-hover:shadow-md transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-primary">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <span className="text-slate-600 font-medium leading-relaxed">{office.address}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a href={`tel:${office.phone}`} className="flex items-center gap-4 p-4 rounded-xl hover:bg-primary hover:text-white transition-all duration-300 border border-transparent shadow-sm bg-slate-50 hover:shadow-lg group/link">
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-primary group-hover/link:text-primary">
                        <Phone className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-bold">{office.phone}</span>
                    </a>

                    <a href={`mailto:${office.email}`} className="flex items-center gap-4 p-4 rounded-xl hover:bg-primary hover:text-white transition-all duration-300 border border-transparent shadow-sm bg-slate-50 hover:shadow-lg group/link">
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-primary group-hover/link:text-primary">
                        <Mail className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-bold truncate">{office.email}</span>
                    </a>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50/50 border border-dashed border-slate-200">
                    <Clock className="h-5 w-5 text-primary" />
                    <span className="text-sm text-slate-500 font-medium">{office.hours}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfficesSection;
