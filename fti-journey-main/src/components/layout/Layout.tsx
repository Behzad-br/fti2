import { ReactNode, useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import ChatAssistant from './ChatAssistant';

import LoadingScreen from '../shared/LoadingScreen';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [loading, setLoading] = useState(() => {
    // Check session storage synchronously to avoid flickering
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem('hasLoadedBefore');
    }
    return true;
  });

  useEffect(() => {
    if (!loading) return;

    const timer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem('hasLoadedBefore', 'true');
    }, 1000); // Reduced to 1 second for a snappier feel

    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <div className="min-h-screen flex flex-col">
      <LoadingScreen isLoading={loading} />
      <Header />
      <main className="flex-1 pt-16 md:pt-20">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
      <ChatAssistant />
    </div>
  );
};

export default Layout;
