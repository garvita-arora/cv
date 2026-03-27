import { useState, useEffect } from 'react';
import { Menu, X, Phone, Instagram } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', href: '#portfolio' },
    { label: 'Academy', href: '#academy' },
    { label: 'Products', href: '#products' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Contact Bar - Always visible */}
      <div 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'opacity-0 -translate-y-full pointer-events-none' 
            : 'opacity-100 translate-y-0'
        }`}
      >
        <div className="bg-gold py-2 px-6 lg:px-12">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <a
              href="https://wa.me/919876543210?text=Hi%20Garvita!%20I%20have%20a%20general%20inquiry."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white text-sm font-medium hover:text-ivory transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <span className="hidden sm:inline">+91 98765 43210</span>
              <span className="sm:hidden">Call Now</span>
            </a>

            {/* Center Text */}
            <p className="hidden md:block text-white/90 text-xs uppercase tracking-wider">
              Always Accepting Bookings
            </p>

            {/* Instagram - Right */}
            <a
              href="https://www.instagram.com/garvitaaroramakeup?utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white text-sm font-medium hover:text-ivory transition-colors"
            >
              <span className="hidden sm:inline">@garvitaarora</span>
              <span className="sm:hidden">Follow</span>
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                <Instagram className="w-3.5 h-3.5" />
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`fixed left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'top-0 bg-ivory/95 backdrop-blur-md shadow-subtle py-4'
            : 'top-10 bg-transparent py-4'
        }`}
      >
        <div className="w-full px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="font-serif text-2xl lg:text-3xl font-semibold text-charcoal tracking-tight"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Garvita Arora
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className="label-text text-charcoal/80 hover:text-gold transition-colors duration-300"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Instagram Icon */}
            <a
              href="https://www.instagram.com/garvitaaroramakeup?utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-charcoal/20 flex items-center justify-center text-charcoal hover:text-gold hover:border-gold transition-all"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>

            <a
              href="https://wa.me/919876543210?text=Hi%20Garvita!%20I%20have%20a%20general%20inquiry."
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-charcoal/20 flex items-center justify-center text-charcoal hover:text-gold hover:border-gold transition-all"
              aria-label="Phone"
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              onClick={() => {
                const message = `Hi Garvita! I would like to book a makeup session.`;
                window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
              }}
              className="btn-primary text-sm py-3 px-6 ml-2"
            >
              Book
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-charcoal"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-30 bg-ivory transition-all duration-500 lg:hidden ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 pt-20">
          {navLinks.map((link, index) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.href)}
              className="font-serif text-3xl text-charcoal hover:text-gold transition-colors"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              const message = `Hi Garvita! I would like to book a makeup session.`;
              window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
            }}
            className="btn-primary mt-6"
          >
            Book a Session
          </button>
          
          {/* Mobile Contact Info */}
          <div className="flex flex-col items-center gap-4 mt-8 pt-8 border-t border-charcoal/10">
            <a
              href="https://wa.me/919876543210?text=Hi%20Garvita!%20I%20have%20a%20general%20inquiry."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-charcoal hover:text-gold transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-gold" />
              </div>
              <span className="text-lg font-medium">+91 98765 43210</span>
            </a>
            <a
              href="https://www.instagram.com/garvitaaroramakeup?utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-charcoal hover:text-gold transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                <Instagram className="w-5 h-5 text-gold" />
              </div>
              <span className="text-lg font-medium">@garvitaarora</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
