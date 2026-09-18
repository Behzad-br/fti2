import { useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const WHATSAPP_NUMBER = '923007442732';
const WHATSAPP_MESSAGE = 'Hi FTI, I want free counselling for study abroad.';

const openWhatsApp = () => {
  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
    '_blank'
  );
};

const WhatsAppButton = () => {
  useEffect(() => {
    const handleOpen = () => openWhatsApp();
    window.addEventListener('open-whatsapp-selector', handleOpen);
    return () => window.removeEventListener('open-whatsapp-selector', handleOpen);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
        onClick={openWhatsApp}
        className="relative w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 active:scale-90 z-50 bg-[#25D366] hover:scale-110"
        aria-label="WhatsApp Support"
      >
        <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
        <MessageCircle className="h-9 w-9 text-white fill-current relative z-10" />
      </motion.button>
    </div>
  );
};

export default WhatsAppButton;
