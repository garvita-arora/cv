import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  quote: string;
  name: string;
  service: string;
}

// Real client stories go here once Garvita shares them — each entry renders
// as a card automatically. Until then the section shows a graceful
// "coming soon" state instead of fabricated quotes.
const testimonials: Testimonial[] = [];

const categories = ['Bridal', 'Party Makeup', 'Pre-Bridal', 'Academy'];

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(content,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleShareExperience = () => {
    const message =
      `Hi Garvita! 👋\n\n` +
      `I'd love to share my experience / feedback about your services. 💖`;
    window.open(`https://wa.me/919548144908?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative bg-ivory py-20 lg:py-32 overflow-hidden"
    >
      {/* Background watermark */}
      <div className="absolute -right-10 top-1/2 -translate-y-1/2 watermark select-none pointer-events-none hidden lg:block">
        LOVE
      </div>

      <div ref={contentRef} className="relative max-w-6xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div className="text-center mb-12 lg:mb-16">
          <p className="label-text text-gold mb-4">Testimonials</p>
          <h2 className="heading-lg font-serif text-charcoal mb-6">
            Kind words.
          </h2>
          <p className="body-text text-text-secondary mx-auto">
            What our brides, students, and clients say about their time with us.
          </p>
        </div>

        {testimonials.length === 0 ? (
          /* Coming-soon state — swapped out automatically once quotes exist */
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-subtle border border-charcoal/5 px-8 py-12 lg:px-14">
              <div className="w-14 h-14 mx-auto rounded-full bg-gold/10 flex items-center justify-center mb-6">
                <Quote className="w-6 h-6 text-gold" />
              </div>
              <p className="font-serif text-2xl lg:text-3xl text-charcoal leading-snug mb-4">
                Real stories are on their way.
              </p>
              <p className="text-text-secondary text-base leading-relaxed mb-8">
                We're gathering experiences from our brides, party-makeup clients,
                pre-bridal guests, and academy students — this space will soon be
                filled with their words.
              </p>

              {/* Category chips */}
              <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
                {categories.map((category) => (
                  <span
                    key={category}
                    className="px-4 py-1.5 rounded-full border border-gold/40 text-gold text-xs uppercase tracking-wider"
                  >
                    {category}
                  </span>
                ))}
              </div>

              <button onClick={handleShareExperience} className="btn-primary">
                Share your experience
                <MessageCircle className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        ) : (
          /* Card grid once real testimonials are added */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-subtle border border-charcoal/5 p-8 flex flex-col"
              >
                <Quote className="w-8 h-8 text-gold/40 mb-5" />
                <p className="text-charcoal/85 text-base leading-relaxed flex-1 mb-6">
                  {testimonial.quote}
                </p>
                <div className="pt-5 border-t border-charcoal/10">
                  <p className="font-serif text-lg text-charcoal">{testimonial.name}</p>
                  <p className="label-text text-gold mt-1">{testimonial.service}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
