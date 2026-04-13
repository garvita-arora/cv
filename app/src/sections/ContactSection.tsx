import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Instagram, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contactBlockRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const contactBlock = contactBlockRef.current;
    const formCard = formCardRef.current;
    const footer = footerRef.current;

    if (!section || !contactBlock || !formCard || !footer) return;

    const ctx = gsap.context(() => {
      // Contact block animation
      gsap.fromTo(contactBlock, 
        { y: 40, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8,
          scrollTrigger: {
            trigger: contactBlock,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Form card animation
      gsap.fromTo(formCard, 
        { y: 60, opacity: 0, scale: 0.98 }, 
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: formCard,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Footer animation
      gsap.fromTo(footer, 
        { opacity: 0 }, 
        { 
          opacity: 1, 
          duration: 0.6,
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const phoneNumber = '919548144908';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hi Garvita! I'd like to enquire about your services.%0A%0AName: ${formData.name}%0AEmail: ${formData.email}%0APhone: ${formData.phone}%0AService: ${formData.service}%0AMessage: ${formData.message}`;
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-ink min-h-screen"
    >
      <div className="w-full px-6 lg:px-12 py-20 lg:py-32">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left Contact Block */}
          <div
            ref={contactBlockRef}
            className="flex-1 max-w-xl"
          >
            <h2 className="heading-lg font-serif text-ivory mb-6">
              Let's work<br />together.
            </h2>
            <p className="text-text-muted-dark text-lg leading-relaxed mb-12">
              Tell us what you're planning. We'll reply with availability, pricing, and next steps.
            </p>

            {/* Contact Details */}
            <div className="space-y-6">
              {/* Phone - Most Prominent */}
              <a
                href="tel:+919548144908"
                className="flex items-center gap-5 text-ivory hover:text-gold transition-colors group"
              >
                <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center group-hover:bg-gold/30 transition-colors">
                  <Phone className="w-7 h-7 text-gold" />
                </div>
                <div>
                  <p className="text-text-muted-dark text-xs uppercase tracking-wider mb-1">Call Us</p>
                  <span className="text-2xl font-serif">+91 95481 44908</span>
                </div>
              </a>

              {/* Instagram - Second Most Prominent */}
              <a
                href="https://www.instagram.com/garvitaaroramakeup?utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-5 text-ivory hover:text-gold transition-colors group"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/30 via-pink-500/30 to-orange-400/30 flex items-center justify-center group-hover:from-purple-500/50 group-hover:via-pink-500/50 group-hover:to-orange-400/50 transition-all">
                  <Instagram className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-text-muted-dark text-xs uppercase tracking-wider mb-1">Follow Us</p>
                  <span className="text-2xl font-serif">@garvitaarora</span>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/919548144908?text=Hello! I visited your website and would like to know more about your services."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-5 text-ivory hover:text-gold transition-colors group"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                  <MessageCircle className="w-7 h-7 text-green-400" />
                </div>
                <div>
                  <p className="text-text-muted-dark text-xs uppercase tracking-wider mb-1">WhatsApp</p>
                  <span className="text-2xl font-serif">+91 95481 44908</span>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:hello@garvitaarora.studio"
                className="flex items-center gap-5 text-ivory/80 hover:text-gold transition-colors group"
              >
                <div className="w-14 h-14 rounded-full border border-ivory/20 flex items-center justify-center group-hover:border-gold transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-lg">hello@garvitaarora.studio</span>
              </a>

              {/* Location */}
              <div className="flex items-center gap-5 text-ivory/80">
                <div className="w-14 h-14 rounded-full border border-ivory/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-lg">New Delhi, India</span>
              </div>
            </div>

            {/* Social Links Row */}
            <div className="flex items-center gap-4 mt-12 pt-8 border-t border-ivory/10">
              <a
                href="https://www.instagram.com/garvitaaroramakeup?utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 rounded-full text-white hover:shadow-lg hover:scale-105 transition-all"
              >
                <Instagram className="w-5 h-5" />
                <span className="font-medium">Follow on Instagram</span>
              </a>
            </div>
          </div>

          {/* Right Form Card */}
          <div
            ref={formCardRef}
            className="flex-1 max-w-xl"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-ivory rounded-xl p-8 lg:p-10"
            >
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="label-text text-charcoal/70 mb-2 block">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-transparent border-b-2 border-charcoal/20 focus:border-gold outline-none transition-colors text-charcoal"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="label-text text-charcoal/70 mb-2 block">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-transparent border-b-2 border-charcoal/20 focus:border-gold outline-none transition-colors text-charcoal"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="label-text text-charcoal/70 mb-2 block">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-transparent border-b-2 border-charcoal/20 focus:border-gold outline-none transition-colors text-charcoal"
                    placeholder="+91 95481 44908"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="label-text text-charcoal/70 mb-2 block">
                    Service
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-transparent border-b-2 border-charcoal/20 focus:border-gold outline-none transition-colors text-charcoal appearance-none cursor-pointer"
                  >
                    <option value="">Select a service</option>
                    <option value="bridal">Bridal Makeup</option>
                    <option value="editorial">Editorial Makeup</option>
                    <option value="academy">Academy Course</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="label-text text-charcoal/70 mb-2 block">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-transparent border-b-2 border-charcoal/20 focus:border-gold outline-none transition-colors text-charcoal resize-none"
                    placeholder="Tell us about your event..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary mt-4"
                >
                  Send via WhatsApp
                  <MessageCircle className="w-4 h-4 ml-2" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        ref={footerRef}
        className="w-full px-6 lg:px-12 py-8 border-t border-ivory/12"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-ivory/60 text-sm">
            © {new Date().getFullYear()} Garvita Arora. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-ivory/60 hover:text-gold text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-ivory/60 hover:text-gold text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default ContactSection;
