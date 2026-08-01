import { useRef, useLayoutEffect, useEffect, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, MessageCircle } from 'lucide-react';
import { openWhatsApp, WA_MESSAGES } from '../lib/whatsapp';
import { testimonials, type TestimonialCategory } from '../data/testimonials';

gsap.registerPlugin(ScrollTrigger);

const FILTERS: Array<'All' | TestimonialCategory> = ['All', 'Bridal', 'Party & Events', 'Academy'];

const STATS = [
  { value: '2200+', label: 'Brides' },
  { value: '8', label: 'Years of artistry' },
  { value: '100+', label: 'Artists mentored' },
];

const INITIAL_COUNT = 6;

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<'All' | TestimonialCategory>('All');
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(
    () => (filter === 'All' ? testimonials : testimonials.filter(t => t.category === filter)),
    [filter]
  );

  const visible = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    if (!section || !header) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(header,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // Filtering / expanding changes the page height, so pinned-section positions
  // and the scroll snap need to be recalculated.
  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => window.clearTimeout(id);
  }, [filter, showAll]);

  const selectFilter = (next: 'All' | TestimonialCategory) => {
    setFilter(next);
    setShowAll(false);
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative bg-ivory py-20 lg:py-28 overflow-hidden"
    >
      {/* Background watermark */}
      <div className="absolute -right-10 top-24 watermark select-none pointer-events-none hidden lg:block">
        LOVE
      </div>

      <div className="relative max-w-6xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div ref={headerRef} className="text-center mb-10 lg:mb-12">
          <p className="label-text text-gold mb-4">Testimonials</p>
          <h2 className="heading-lg font-serif text-charcoal mb-5">Kind words.</h2>
          <p className="body-text text-text-secondary mx-auto text-sm lg:text-base">
            Real messages from our brides, clients, and academy students.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 mt-10 pt-8 border-t border-charcoal/10 max-w-2xl mx-auto">
            {STATS.map(stat => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-3xl lg:text-4xl text-gold leading-none mb-1.5">
                  {stat.value}
                </p>
                <p className="label-text text-charcoal/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {FILTERS.map(option => {
            const active = filter === option;
            return (
              <button
                key={option}
                onClick={() => selectFilter(option)}
                className={`px-5 py-2 rounded-full text-sm font-medium border transition-all ${
                  active
                    ? 'bg-gold border-gold text-white shadow-md'
                    : 'border-charcoal/20 text-charcoal/75 hover:border-gold hover:text-gold'
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {/* Testimonial cards (masonry via CSS columns) */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-5 lg:gap-6">
          {visible.map((testimonial, index) => (
            <figure
              key={`${testimonial.name}-${index}`}
              className="break-inside-avoid mb-5 lg:mb-6 bg-white rounded-2xl shadow-subtle border border-charcoal/5 p-6 lg:p-7"
            >
              <Quote className="w-7 h-7 text-gold/35 mb-4" />
              <blockquote className="text-charcoal/85 text-[15px] leading-relaxed mb-5">
                {testimonial.quote}
              </blockquote>
              <figcaption className="pt-4 border-t border-charcoal/10">
                <p className="font-serif text-lg text-charcoal leading-tight">{testimonial.name}</p>
                <p className="label-text text-gold mt-1.5">{testimonial.service}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Show more / less */}
        {filtered.length > INITIAL_COUNT && (
          <div className="text-center mt-4">
            <button onClick={() => setShowAll(prev => !prev)} className="btn-secondary">
              {showAll
                ? 'Show fewer'
                : `Read all ${filtered.length} reviews`}
            </button>
          </div>
        )}

        {/* Share CTA */}
        <div className="text-center mt-14 pt-10 border-t border-charcoal/10">
          <p className="font-serif text-2xl lg:text-3xl text-charcoal mb-3">
            Been in our chair?
          </p>
          <p className="text-text-secondary text-sm mb-7 max-w-md mx-auto leading-relaxed">
            We would love to hear how your day went.
          </p>
          <button onClick={() => openWhatsApp(WA_MESSAGES.feedback)} className="btn-primary">
            Share your experience
            <MessageCircle className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
