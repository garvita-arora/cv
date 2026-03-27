import { useState, useEffect } from 'react';
import { MessageCircle, X, Phone, Calendar, Sparkles, BookOpen } from 'lucide-react';

const WhatsAppChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show button after scrolling down a bit
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const phoneNumber = '919876543210'; // Replace with actual number
  
  const quickReplies = [
    { icon: Calendar, label: 'Book Appointment', message: 'Hi! I would like to book a makeup appointment. Please share your availability.' },
    { icon: Sparkles, label: 'Bridal Package', message: 'Hello! I am interested in your bridal makeup package. Can you share more details?' },
    { icon: BookOpen, label: 'Academy Courses', message: 'Hi! I would like to know more about your makeup academy courses.' },
    { icon: Phone, label: 'General Inquiry', message: 'Hello! I have a question about your services.' },
  ];

  const handleQuickReply = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      <div
        className={`mb-4 bg-white rounded-2xl shadow-card overflow-hidden transition-all duration-500 ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        style={{ width: '320px' }}
      >
        {/* Header */}
        <div className="bg-gold p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-white font-medium text-sm">Garvita Arora</h4>
              <p className="text-white/70 text-xs">Typically replies within minutes</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Chat Content */}
        <div className="p-4 bg-ivory/50">
          <div className="bg-white rounded-2xl rounded-tl-sm p-4 shadow-subtle mb-4">
            <p className="text-charcoal text-sm leading-relaxed">
              Hello! Welcome to Garvita Arora Makeup & Academy. How can we help you today? 💄
            </p>
          </div>

          {/* Quick Replies */}
          <div className="space-y-2">
            <p className="text-text-secondary text-xs uppercase tracking-wider mb-2">Quick Options</p>
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => handleQuickReply(reply.message)}
                className="w-full flex items-center gap-3 p-3 bg-white rounded-xl hover:bg-gold/5 hover:border-gold/30 border border-transparent transition-all group"
              >
                <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <reply.icon className="w-4 h-4 text-gold" />
                </div>
                <span className="text-charcoal text-sm font-medium">{reply.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-white border-t border-charcoal/5 text-center">
          <p className="text-text-secondary text-xs">
            Powered by{' '}
            <span className="text-gold font-medium">WhatsApp</span>
          </p>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group flex items-center gap-3 transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {/* Label */}
        <span
          className={`bg-white px-4 py-2 rounded-full shadow-subtle text-charcoal text-sm font-medium transition-all duration-300 ${
            isOpen ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
          }`}
        >
          Chat with us
        </span>

        {/* Button */}
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-card transition-all duration-300 ${
            isOpen ? 'bg-charcoal rotate-90' : 'bg-gold hover:bg-gold-dark hover:scale-110'
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <MessageCircle className="w-6 h-6 text-white" />
          )}
        </div>
      </button>
    </div>
  );
};

export default WhatsAppChat;
