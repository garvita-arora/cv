import { useState, useEffect } from 'react';
import { Instagram, Phone, MessageCircle } from 'lucide-react';
import { waLink, WA_MESSAGES } from '../lib/whatsapp';

const FloatingSocial = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-4 left-4 lg:bottom-6 lg:left-6 z-50 flex flex-row lg:flex-col gap-3 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      {/* Instagram */}
      <a
        href="https://www.instagram.com/garvitaaroramakeup?utm_source=qr"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative"
        aria-label="Follow on Instagram"
      >
        <div className="w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
          <Instagram className="w-5 h-5 text-white" />
        </div>
        {/* Tooltip */}
        <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-charcoal text-white text-xs px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Follow @garvitaarora
        </span>
      </a>

      {/* Phone */}
      <a
        href="tel:+919548144908"
        className="group relative"
        aria-label="Call Now"
      >
        <div className="w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-gold flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
          <Phone className="w-5 h-5 text-white" />
        </div>
        {/* Tooltip */}
        <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-charcoal text-white text-xs px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          +91 95481 44908
        </span>
      </a>

      {/* WhatsApp */}
      <a
        href={waLink(WA_MESSAGES.general)}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative"
        aria-label="Chat on WhatsApp"
      >
        <div className="w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-green-500 flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
          <MessageCircle className="w-5 h-5 text-white" />
        </div>
        {/* Tooltip */}
        <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-charcoal text-white text-xs px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
};

export default FloatingSocial;
