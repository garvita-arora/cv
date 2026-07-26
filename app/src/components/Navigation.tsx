import { useState, useEffect } from 'react';
import { Menu, X, Phone, Instagram, ChevronDown } from 'lucide-react';
import { smoothScrollTo, smoothScrollToTop } from '../lib/scroll';
import { openEnquiry } from '../lib/whatsapp';

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

  const workOptions = [
    { label: 'Bridal Makeup', href: '#bridal' },
    { label: 'Non Bridal Makeups', href: '#packages' },
    { label: 'Pre Bridal Services', href: '#selfcare' },
    { label: 'Groom Makeup', href: '#contact' },
  ];

  const navLinks = [
    { label: 'Academy', href: '#academy' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    smoothScrollTo(href);
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
              href="tel:+919548144908"
              className="flex items-center gap-2 text-white text-sm font-medium hover:text-ivory transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <span className="hidden sm:inline">+91 95481 44908</span>
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
            : 'top-10 bg-ivory/80 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none py-4'
        }`}
      >
        <div className="w-full px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="font-serif text-2xl lg:text-3xl font-semibold text-charcoal tracking-tight"
            onClick={(e) => {
              e.preventDefault();
              smoothScrollToTop();
            }}
          >
            Garvita Arora
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {/* Work dropdown */}
            <div className="relative group">
              <button className="label-text text-charcoal/80 hover:text-gold transition-colors duration-300 flex items-center gap-1.5">
                Work
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
              </button>
              <div className="absolute left-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-300">
                <div className="bg-ivory border border-charcoal/10 shadow-card rounded-xl py-2 min-w-[230px]">
                  {workOptions.map((option) => (
                    <button
                      key={option.label}
                      onClick={() => scrollToSection(option.href)}
                      className="w-full text-left px-5 py-2.5 text-sm text-charcoal/80 hover:text-gold hover:bg-gold/5 transition-colors"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

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
              href="tel:+919548144908"
              className="w-10 h-10 rounded-full border border-charcoal/20 flex items-center justify-center text-charcoal hover:text-gold hover:border-gold transition-all"
              aria-label="Call Now"
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              onClick={() => openEnquiry('booking')}
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
        className={`fixed inset-0 z-30 bg-ivory transition-all duration-500 lg:hidden overflow-y-auto ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-start min-h-full gap-6 pt-28 pb-12">
          {/* Work group */}
          <div className="flex flex-col items-center gap-3">
            <span className="font-serif text-3xl text-charcoal">Work</span>
            {workOptions.map((option) => (
              <button
                key={option.label}
                onClick={() => scrollToSection(option.href)}
                className="text-base text-charcoal/70 hover:text-gold transition-colors"
              >
                {option.label}
              </button>
            ))}
          </div>

          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.href)}
              className="font-serif text-3xl text-charcoal hover:text-gold transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              openEnquiry('booking');
            }}
            className="btn-primary mt-6"
          >
            Book a Session
          </button>

          {/* Mobile Contact Info */}
          <div className="flex flex-col items-center gap-4 mt-8 pt-8 border-t border-charcoal/10">
            <a
              href="tel:+919548144908"
              className="flex items-center gap-3 text-charcoal hover:text-gold transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-gold" />
              </div>
              <span className="text-lg font-medium">+91 95481 44908</span>
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
