import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

const ApplyIELTS = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', courseType: '', targetBand: '', timing: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.country) {
      toast({ title: 'Please fill required fields', variant: 'destructive' });
      return;
    }
    setSubmitted(true);
    toast({ title: 'Application submitted!', description: 'Our counsellor will contact you within 24 hours.' });
  };

  if (submitted) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center p-8">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full gradient-primary flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">Application Received!</h1>
            <p className="text-muted-foreground mb-6">Thank you for your interest. Our counsellor will contact you within 24 hours.</p>
            <Button variant="hero" onClick={() => setSubmitted(false)}>Submit Another</Button>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page-transition">
        <section className="gradient-primary py-20 md:py-32">
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Apply for IELTS Training</h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">Join the biggest IELTS campus and achieve your target band.</p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-2xl">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-card p-8 space-y-5">
              <Input placeholder="Full Name *" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
              <Input placeholder="Phone / WhatsApp *" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
              <Input type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              <Select value={formData.courseType} onValueChange={(v) => setFormData({...formData, courseType: v})}>
                <SelectTrigger className="bg-background"><SelectValue placeholder="IELTS Course Type *" /></SelectTrigger>
                <SelectContent className="bg-white z-50">
                  {["IELTS Academic", "IELTS General", "IELTS UKVI", "IELTS Life Skills"].map(q => <SelectItem key={q} value={q}>{q}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={formData.targetBand} onValueChange={(v) => setFormData({...formData, targetBand: v})}>
                <SelectTrigger className="bg-background"><SelectValue placeholder="Target Band *" /></SelectTrigger>
                <SelectContent className="bg-white z-50">
                  {['6.0', '6.5', '7.0', '7.5', '8.0+'].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={formData.timing} onValueChange={(v) => setFormData({...formData, timing: v})}>
                <SelectTrigger className="bg-background"><SelectValue placeholder="Preferred Timing" /></SelectTrigger>
                <SelectContent className="bg-white z-50">
                  {['Morning (9 AM - 1 PM)', 'Afternoon (2 PM - 6 PM)', 'Evening (6 PM - 9 PM)'].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
              <Button type="submit" variant="hero" size="lg" className="w-full">Submit Application</Button>
            </form>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ApplyIELTS;
